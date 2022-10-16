import Head from "next/head";
import Footer from "../components/Footer";
import styles from "../styles/legal.module.scss";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Chessgains - Terms</title>
        <meta name="terms" content="Chessgains - skill-based lottery for chess lovers - terms of service" />
      </Head>
      <main className={styles.legal}>
        <div className={styles.legal__wrapper}>
          <h1 className={styles.legal__title}>Terms Of Service</h1>
          <div className={styles.legal__container}>
            <p className={styles.legal__sub_title_p_top_16}>Overview</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              This website is operated by Chessgains a.k.a. SUNCHAIN LTD. Throughout the site, the terms “we”, “us” and “our”
              refer to Chessgains. Chessgains offers this website, including all information, tools and Services available from
              this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated
              here.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              By visiting our site you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms
              of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or
              available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users
              who are browsers, participants, and/or contributors of content.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part
              of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of
              this agreement, then you may not access the website or use any Services.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Any new features or tools which are added to the current web site shall also be subject to the Terms of Service. You
              can review the most current version of the Terms of Service at any time on this page.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or
              changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of
              or access to the website following the posting of any changes constitutes acceptance of those changes.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Our website is hosted on the following platforms.
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                Digital Ocean LLC – provides us with the architecture for running our game-related server
                processes.
              </li>
              <li className={styles.legal__item}>
                Vercel Inc. – provides us with the technology for serving our site layout and graphics.
              </li>
              <li className={styles.legal__item}>
                Moralis Web3 Technology – provides us with the ability for storing user data and communicating with blockchain.
              </li>
            </ul>
            <p className={styles.legal__sub_title}>Section 1 - Web Site Terms</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              By agreeing to these Terms of Service, you represent that you are at least of age of 18, or that you are the age of
              majority in your state or province of residence and you have given us your consent to allow any of your minor
              dependents to use this site.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              You may not use our services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate
              any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or
              viruses or any code of a destructive nature.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              A breach or violation of any of the Terms will result in an immediate termination of your Services.
            </p>
            <p className={styles.legal__sub_title}>Section 2 - General Conditions</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We reserve the right to refuse Service to anyone for any reason at any time. You understand that your content (not
              including credit card information), may be transferred unencrypted and involve (a) transmissions over various
              networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit
              card information is always encrypted during transfer over networks.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service,
              or access to the Service or any contact on the website through which the Service is provided, without express
              written permission by us.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              The headings used in this agreement are included for convenience only and will not limit or otherwise affect these
              Terms.
            </p>
            <p className={styles.legal__sub_title}>Section 3 - Accuracy and Completeness of Information</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We are not responsible if information made available on this site is not accurate, complete or current. The material
              on this site is provided for general information only and should not be relied upon or used as the sole basis for
              making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any
              reliance on the material on this site is at your own risk.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              This site may contain certain historical information. Historical information, necessarily, is not current and is
              provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have
              no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to
              our site.
            </p>
            <p className={styles.legal__sub_title}>Section 4 - Modifications and Prices</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              The price of our service is subject to change without notice. We reserve the right at any time to modify or
              discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you
              or to any third-party for any modification, price change, suspension or discontinuance of the Service.
            </p>
            <p className={styles.legal__sub_title}>Section 5 - Services</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We reserve the right to modify descriptions of our services at anytime without notice, at the sole discretion of us.
              We reserve the right to discontinue our services any time. We do not warrant that the quality of our services,
              information, or other material obtained by you on our website will meet your expectations, or that any errors in the
              Service will be corrected.
            </p>
            <p className={styles.legal__sub_title}>Section 6 - Third Party Services</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
              You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties,
              representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising
              from or relating to your use these third-party tools. Any use by you of the third-party tools offered through the
              site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the
              terms on which tools are provided by the relevant third-party provider(s).
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We may also, in the future, offer new Services and/or features through the website (including the release of new
              tools and resources). Such new features and/or Services shall also be subject to these Terms of Service.
            </p>
            <p className={styles.legal__sub_title}>Section 8 - Third Party Links</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Certain content, products and Services available via our Service may include materials from third-parties.
              Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not
              responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any
              liability or responsibility for any third-party materials or websites, or for any other materials, products, or
              Services of third-parties.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We are not liable for any harm or damages related to the purchase of the services made in connection with any
              third-party websites. Please review carefully the third-party's policies and practices and make sure you understand
              them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products
              should be directed to the third-party.
            </p>
            <p className={styles.legal__sub_title}>Section 9 - Comments and Feedback</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              If, at our request,or without a request from us, you send creative ideas, suggestions, proposals, plans, or other
              materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may,
              at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any
              comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence;
              (2) to pay compensation for any comments; or (3) to respond to any comments.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be
              unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates
              any party’s intellectual property or these Terms of Service. You agree that your comments will not violate any right
              of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You
              further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or
              contain any computer virus or other malware that could in any way affect the operation of the Service or any related
              website. You may not use a false e mail address, pretend to be someone other than yourself, or otherwise mislead us
              or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their
              accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
            </p>
            <p className={styles.legal__sub_title}>Section 10 - Personal Information</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Your submission of personal information through the site is governed by our Privacy Policy, which can be viewed
              here:{" "}
              <Link href="/privacy" target="_blank" rel="noreferrer">
                <a className={styles.legal__link}>link</a>
              </Link>
              .
            </p>
            <p className={styles.legal__sub_title}>Section 11 - Errors and Inaccuracies</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies
              or omissions that may relate to service description and pricing. We reserve the right to correct any errors,
              inaccuracies or omissions, and to change or update information without prior notice (including after you have
              engaged with the Service).
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We undertake no obligation to update, amend or clarify information in the Service or on any related website,
              including without limitation, pricing information, except as required by law. No specified update or refresh date
              applied in the Service or on any related website, should be taken to indicate that all information in the Service or
              on any related website has been modified or updated.
            </p>
            <p className={styles.legal__sub_title}>Section 12 - Prohibited Uses</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or
              its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c)
              to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to
              infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to
              harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual
              orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading
              information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any
              way that will affect the functionality or operation of the Service or of any related website, other websites, or the
              Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider,
              crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security
              features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate
              your use of the Service or any related website for violating any of the prohibited uses.
            </p>
            <p className={styles.legal__sub_title}>Section 13 - Limitation of Liability</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or
              error-free. We do not warrant that the results that may be obtained from the use of the Service will be accurate or
              reliable. You agree that from time to time we may remove the Service for indefinite periods of time or cancel the
              Service at any time, without notice to you. You expressly agree that your use of, or inability to use, the Service
              is at your sole risk. The Service delivered to you (except as expressly stated by us) is provided 'as is' and 'as
              available' for your use, without any representation, warranties or conditions of any kind, either express or
              implied.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              In no case shall Chessgains, our directors, officers, employees, affiliates, agents, contractors, interns,
              suppliers, Service providers or licensors be liable for any injury, loss, claim, or any direct, indirect,
              incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits,
              lost revenue, lost savings, loss of data, or any similar damages. Because some states or jurisdictions do not allow
              the exclusion or the limitation of liability for consequential or incidental damages, in such states or
              jurisdictions, our liability shall be limited to the maximum extent permitted by law.
            </p>
            <p className={styles.legal__sub_title}>Section 14 - Indemnification</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              You agree to indemnify, defend and hold harmless Chessgains and our parent, subsidiaries, affiliates, partners,
              officers, directors, agents, contractors, licensors, Service providers, subcontractors, suppliers, interns and
              employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to
              or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your
              violation of any law or the rights of a third-party.
            </p>
            <p className={styles.legal__sub_title}>Section 15 - Severability</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such
              provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable
              portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity
              and enforceability of any other remaining provisions.
            </p>
            <p className={styles.legal__sub_title}>Section 16 - Termination</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination
              of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you
              or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our
              Services, or when you cease using our site.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these
              Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all
              amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or
              any part thereof).
            </p>
            <p className={styles.legal__sub_title}>Section 18 - Governing Law</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and
              construed in accordance with the laws of the United Kingdom.
            </p>
            <p className={styles.legal__sub_title}>Section 19 - Changes to Terms of Service</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at
              our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes
              to our website. It is your responsibility to check our website periodically for changes. Your continued use of or
              access to our website or the Service following the posting of any changes to these Terms of Service constitutes
              acceptance of those changes.
            </p>
            <p className={styles.legal__sub_title}>Section 20 - Contact Information</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Questions about the Terms of Service should be sent to us at <b>info@chessgains.com</b>.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Our contact information is posted below:
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>SunChain Ltd</b>
            </p>
            <p className={styles.legal__paragraph_padding_zero}>128 City Road, EC1V 2NX, London, United Kingdom</p>
            <p className={styles.legal__paragraph_padding_zero}>Reg #: 14378160</p>
            <p className={styles.legal__paragraph_padding_zero}>info@chessgains.com</p>
            <p className={styles.legal__paragraph_padding_zero}>+442045772359</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
