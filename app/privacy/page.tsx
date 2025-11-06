"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: November 6, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-foreground font-bold text-2xl mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-foreground font-bold text-2xl mb-4">2. Information We Collect</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-foreground font-bold text-xl mb-3">2.1. Personal Data You Provide</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </p>
                </div>

                <div>
                  <h3 className="text-foreground font-bold text-xl mb-3">2.2. Automatically Collected Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-foreground font-bold text-2xl mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                dolor sit amet, consectetur, adipisci velit.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-foreground font-bold text-2xl mb-4">4. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut quid
                ex eum commodi consequatur.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
