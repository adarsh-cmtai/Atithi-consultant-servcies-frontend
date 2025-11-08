"use client"

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable, PaginationState } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector, RootState } from "@/lib/store";
import { fetchJobApplications, JobApplication, clearDetailedApplication } from "@/lib/features/admin/adminSlice";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AdminApplicationDetailsView } from "./AdminApplicationDetailsView";
import { ArrowUpDown, MoreHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Review": "bg-blue-100 text-blue-800 border-blue-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export function JobApplicationsTable() {
  const dispatch = useAppDispatch();
  const { jobApplications, jobPagination, jobApplicationsStatus } = useAppSelector((state: RootState) => state.admin);
  const [selectedApp, setSelectedApp] = React.useState<JobApplication | null>(null);

  const columns = React.useMemo<ColumnDef<JobApplication>[]>(() => [
    { id: "select", header: ({ table }) => (<Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />), cell: ({ row }) => (<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />), enableSorting: false, enableHiding: false },
    { accessorKey: "applicantName", header: ({ column }) => (<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Applicant Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>) },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "submissionDate", header: "Submission Date", cell: ({ row }) => new Date(row.getValue("submissionDate")).toLocaleDateString() },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant="outline" className={cn(statusColors[row.getValue("status") as string])}>{row.getValue("status")}</Badge> },
    { accessorKey: "assignedTo", header: "Assigned To" },
    { id: "actions", cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setSelectedApp(row.original)}>View Details</DropdownMenuItem>
          </DialogTrigger>
          {/* <DropdownMenuItem>Assign To...</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    )},
  ], []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const queryParams = React.useMemo(() => ({
    page: pageIndex + 1,
    limit: pageSize,
    search: searchTerm,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
  }), [pageIndex, pageSize, searchTerm, sorting]);

  React.useEffect(() => {
    const debouncedFetch = setTimeout(() => {
      dispatch(fetchJobApplications(queryParams));
    }, 300);
    return () => clearTimeout(debouncedFetch);
  }, [dispatch, queryParams]);

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
        setSelectedApp(null);
        dispatch(clearDetailedApplication());
    }
  };

  const table = useReactTable({
    data: jobApplications,
    columns,
    pageCount: jobPagination.totalPages ?? -1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <Dialog onOpenChange={handleDialogChange}>
      <div className="w-full">
        <div className="flex items-center py-4 gap-4">
          <Input placeholder="Filter by applicant name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="ml-auto">Columns <ChevronDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (<DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>{column.id}</DropdownMenuCheckboxItem>))}</DropdownMenuContent></DropdownMenu>
        </div>
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>{table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>{headerGroup.headers.map((header) => (<TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>))}</TableRow>))}</TableHeader>
            <TableBody>
              {jobApplicationsStatus === "loading" ? ( Array.from({ length: pageSize }).map((_, i) => (<TableRow key={i}><TableCell colSpan={columns.length}><Skeleton className="h-8 w-full" /></TableCell></TableRow>)) ) : 
                table.getRowModel().rows?.length ? ( table.getRowModel().rows.map((row) => (<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>{row.getVisibleCells().map((cell) => (<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}</TableRow>)) ) : 
                (<TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell></TableRow>)
              }
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">{Object.keys(rowSelection).length} of {jobPagination.totalDocuments} row(s) selected.</div>
          <div className="space-x-2"><Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button><Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button></div>
        </div>
      </div>
      <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
              <DialogTitle>Job Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && <AdminApplicationDetailsView appId={selectedApp._id} type="job" />}
      </DialogContent>
    </Dialog>
  );
}