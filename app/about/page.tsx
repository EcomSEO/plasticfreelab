import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About PlasticFreeLab",
  description: "Who we are, what we do, and why we built this.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <TrustPageTemplate title="About PlasticFreeLab">
      <p>PlasticFreeLab exists because the information about non-toxic living is a mess.</p>
      <p>
        Some of it is real — peer-reviewed science on microplastics, PFAS, and
        endocrine disruptors, moving faster than most people realize. Some of
        it is garbage — wellness influencers with a supplement line to sell,
        scaring their audience about something that isn&apos;t actually a problem.
        A lot of it is somewhere in between, from well-meaning writers who
        didn&apos;t have time to read the studies.
      </p>
      <p>
        We built PlasticFreeLab to be the calm, cited, investigative resource
        we kept wishing existed. We read the studies. We test the products.
        We tell you the three things that actually matter and the seven things
        you can stop worrying about.
      </p>

      <h2>What we do</h2>
      <ul>
        <li>
          <strong>We test.</strong> When we recommend a product, we either bought
          it ourselves, tested it in our own homes, or we tell you explicitly
          that we evaluated it from research. We don&apos;t blur the line.
        </li>
        <li>
          <strong>We cite.</strong> Every health claim has a source you can check
          — a peer-reviewed paper, a regulatory document, a manufacturer
          disclosure. No &ldquo;studies show.&rdquo; No &ldquo;experts say.&rdquo;
        </li>
        <li>
          <strong>We update.</strong> Product formulations change. Studies get
          retracted. New evidence arrives. We review every comparison page
          quarterly and update the ranking when the evidence moves.
        </li>
        <li>
          <strong>We rank.</strong> When we compare products, we commit to a #1
          pick. &ldquo;Here are some options to consider&rdquo; is not useful.
          We tell you what to buy, why, and what to skip.
        </li>
      </ul>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t take money for placement. Affiliate commissions never affect our rankings.</li>
        <li>We don&apos;t write scary headlines. A real risk described in a calm voice lands harder than the loudest panic post.</li>
        <li>We don&apos;t tell you everything is toxic. Most things are fine. A small number of things are worth replacing. We help you know which is which.</li>
      </ul>

      <h2>How to get in touch</h2>
      <p>
        Found a mistake? We want to know. Have a product we should test? Tell
        us. Write to us at{" "}
        <Link href="/contact">hello@plasticfreelab.com</Link>.
      </p>

      <p>The PlasticFreeLab Team</p>
    </TrustPageTemplate>
  );
}
