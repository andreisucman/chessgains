import Head from "next/head";
import Footer from "../components/Footer";
import styles from "../styles/legal.module.scss";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Chessgains - Privacy policy</title>
        <meta name="privacy" content="Chessgains - Skill-based tournament for chess lovers - privacy policy" />
      </Head>
      <main className={styles.legal}>
        <div className={styles.legal__wrapper}>
          <h1 className={styles.legal__title}>Privacy Policy</h1>
          <div className={styles.legal__container}>
            <p className={styles.legal__paragraph}>
              This Privacy Policy describes how Chessgains (the “Site” or “we”) collects, uses, and discloses your Personal
              Information when you visit or interact with the Site.
            </p>
            <p className={styles.legal__sub_title}>Contact</p>
            <p className={styles.legal__paragraph}>
              If after reviewing this policy, you have additional questions, want more information about our privacy practices, or
              would like to make a complaint, please contact us by e-mail at <b>info@chessgains.com</b> or by mail at the address
              provided below:
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_address}`}>
              SUNCHAIN LTD, 128 City Road, London, EC1V 2NX
            </p>
            <p className={styles.legal__sub_title}>Collecting Information</p>
            <p className={styles.legal__paragraph_less_bottom}>
              When you visit the Site, we collect certain information about your device, your interaction with the Site, and
              information necessary to process your interaction with the Site. We may also collect additional information if you
              contact us for customer support. In this Privacy Policy, we refer to any information about an identifiable
              individual as “Personal Information”. See the list below for more information about what Personal Information we
              collect and why.
            </p>
            <p className={styles.legal__paragraph}>
              <b>Device information</b>
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                <u>Purpose of collection:</u> to load the Site accurately and perform analytics on Site usage.
              </li>
              <li className={styles.legal__item}>
                <u>Source:</u> collected automatically when you access our Site using cookies, log files, web beacons, tags, or
                pixels
              </li>
              <li className={styles.legal__item}>
                <u>Information collected:</u> version of web browser, IP address, time zone, cookie information and how you
                interact with the Site
              </li>
              <li className={styles.legal__item}>
                <u>Disclosure for a business purpose:</u> shared with our processors and 3rd party service providers - Moralis
                Web3 Technology, and Torus Labs Pte.
              </li>
            </ul>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>User information</b>
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                <u>Purpose of collection:</u> to correctly identify you and accurately provide you with the service.
              </li>
              <li className={styles.legal__item}>
                <u>Source:</u> collected automatically when you create an account, log in, and interact with the Site.
              </li>
              <li className={styles.legal__item}>
                <u>Information collected:</u> your wallet address on Polygon Matic chain, wallet balance, tokens in your wallet,
                your email address, your phone number.
              </li>
              <li className={styles.legal__item}>
                <u>Disclosure for a business purpose:</u> shared with our processors and 3rd party service providers - Moralis
                Web3 Technology, Torus Labs Pte, and Safudex B.V.
              </li>
            </ul>
            <p className={styles.legal__sub_title}>Minors</p>
            <p className={styles.legal__paragraph}>
              The Site is not intended for individuals under the age of 18. We do not intentionally collect Personal Information
              from children. If you are the parent or guardian and believe your child has provided us with Personal Information,
              please contact us at the address above to request deletion.
            </p>
            <p className={styles.legal__sub_title}>Sharing Information</p>
            <p className={styles.legal__paragraph}>
              We share your Personal Information with service providers to help us provide our services to you, as described
              above. For example:
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                We use Moralis Web3 Technology to store your data and provide you with the access to blockchain. You can read more
                about how Moralis Web3 Technology handles your Personal Information here:{" "}
                <a href="https://moralis.io/privacy-policy/" target="_blank" rel="noreferrer" className={styles.legal__link}>
                  Moralis privacy policy
                </a>
              </li>
              <li className={styles.legal__item}>
                We use Torus Labs Private Limited to enable you to create the web3 wallet for you that is necessary to interact
                with our app. You can read more about how Torus Labs Pte handles your Personal Information here:{" "}
                <a
                  href="https://web3auth.io/docs/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.legal__link}
                >
                  Torus Labs privacy policy
                </a>
              </li>
              <li className={styles.legal__item}>
                We use Onramper a.k.a. Safudex B.V. to give you the possibility to buy Matic tokens necessary to interact with our
                app, with your credit card. You can read more about how Safudex B.V. handles your Personal Information here:{" "}
                <a href="https://onramper.com/privacy-policy/" target="_blank" rel="noreferrer" className={styles.legal__link}>
                  Onramper privacy policy
                </a>
              </li>
              <li className={styles.legal__item}>
                We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena,
                search warrant or other lawful request for information we receive, or to otherwise protect our rights.
              </li>
            </ul>
            <p className={styles.legal__sub_title}>Behavioural Advertising</p>
            <p className={styles.legal__paragraph}>
              As described above, we use your Personal Information to provide you with targeted advertisements or marketing
              communications we believe may be of interest to you. For example:
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google
                uses your Personal Information here:{" "}
                <a
                  href="https://www.google.com/intl/en/policies/privacy/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.legal__link}
                >
                  Google privacy policy{" "}
                </a>
                You can also opt-out of Google Analytics here:{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.legal__link}
                >
                  link
                </a>
                .
              </li>
              <li className={styles.legal__item}>
                We share information about your use of the Site, and your interaction with our ads on other websites with our
                advertising partners. We collect and share some of this information directly with our advertising partners, and in
                some cases through the use of cookies or other similar technologies (which you may consent to, depending on your
                location).
              </li>
            </ul>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              For more information about how targeted advertising works, you can visit the Network Advertising Initiative"s
              ("NAI") educational page at
              <a
                href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work."
                target="_blank"
                rel="noreferrer"
                className={styles.legal__link}
              >
                {" "}
                this page.
              </a>
            </p>
            <p className={styles.legal__paragraph}>You can opt out of targeted advertising by using the links below:</p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                Google:{" "}
                <a
                  href="https://www.google.com/settings/ads/anonymous"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.legal__link}
                >
                  link{" "}
                </a>
              </li>
              <li className={styles.legal__item}>
                Digital Advertising Alliance"s opt-out portal:{" "}
                <a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer" className={styles.legal__link}>
                  link
                </a>
                .
              </li>
            </ul>
            <p className={styles.legal__sub_title}>Using Information</p>
            <p className={styles.legal__paragraph}>
              We use your personal information to provide our services to you, which includes: registering you an account, logging
              you in, processing and storing your game score, and processing payments.
            </p>
            <p className={styles.legal__paragraph_padding_zero}>
              <b>Lawful Basis</b>
            </p>
            <p className={styles.legal__paragraph}>
              Pursuant to the General Data Protection Regulation (GDPR), if you are a resident of the European Economic Area
              (EEA), we process your personal information under the following lawful bases:
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>Your consent (granted by using the Site)</li>
              <li className={styles.legal__item}>The performance of the contract between you and the Site</li>
              <li className={styles.legal__item}>Compliance with our legal obligations</li>
              <li className={styles.legal__item}>To protect your vital interests</li>
              <li className={styles.legal__item}>To perform a task carried out in the public interest</li>
              <li className={styles.legal__item}>
                For our legitimate interests, which do not override your fundamental rights and freedoms
              </li>
            </ul>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>Retention</b>
            </p>
            <p className={styles.legal__paragraph}>
              When you interact with the Site, we will retain your Personal Information for our records unless and until you ask
              us to erase this information. For more information on your right of erasure, please see the "Your rights" section
              below.
            </p>
            <p className={styles.legal__sub_title}>Automatic decision-making</p>
            <p className={styles.legal__paragraph}>
              If you are a resident of the EEA, you have the right to object to processing based solely on automated
              decision-making (which includes profiling), when that decision-making has a legal effect on you or otherwise
              significantly affects you.
            </p>
            <p className={styles.legal__paragraph_top_bottom_eight}>
              We do not engage in fully automated decision-making that has a legal or otherwise significant effect using customer
              data.
            </p>
            <p className={styles.legal__paragraph_top_bottom_eight}>
              Our processors use limited automated decision-making to prevent fraud that does not have a legal or otherwise
              significant effect on you.
            </p>
            <p className={styles.legal__paragraph_top_bottom_eight}>
              Services that include elements of automated decision-making include:
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                Temporary blacklist of IP addresses associated with repeated failed transactions. This blacklist persists for a
                small number of hours.
              </li>
              <li className={styles.legal__item}>
                Temporary blacklist of credit cards associated with blacklisted IP addresses. This blacklist persists for a small
                number of days.
              </li>
            </ul>
            <p className={styles.legal__sub_title}>Your Rights</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>GDPR</b>
            </p>
            <p className={styles.legal__paragraph}>
              If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port
              it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like
              to exercise these rights, please contact us through the contact information above.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>CCPA</b>
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              If you are a resident of California, you have the right to access the Personal Information we hold about you (also
              known as the 'Right to Know'), to port it to a new service, and to ask that your Personal Information be corrected,
              updated, or erased. If you would like to exercise these rights, please contact us through the contact information
              above.
            </p>
            <p className={styles.legal__paragraph}>
              If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the
              address above.
            </p>
            <p className={styles.legal__sub_title}>Cookies</p>
            <p className={styles.legal__paragraph}>
              A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We
              use the following cookies to understand your usage of our site and improve your browsing experience:
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>Google Analytics (Google LLC)</b>
            </p>
            <p className={styles.legal__paragraph}>
              Google Analytics (_ga, _gid cookies) enables us to monitor and analyze web traffic and keep track of User behavior.
              It is included in each page request and calculates visitor, session and campaign data for our analytics reports.
              Google may use the Data collected on our website to contextualize and personalize the ads of its own advertising
              network.
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                <u>Personal Data collected:</u> device data, user data, usage data
              </li>
              <li className={styles.legal__item}>
                <u>Duration:</u> 2 years
              </li>
            </ul>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>Open Login (Torus Labs Private Limited)</b>
            </p>
            <p className={styles.legal__paragraph}>
              Open Login (crisp-client cookies) allows us to keep track of the session id of the logged in users. This frees our
              users from having to go through the authentication process each time they visit the site.
            </p>
            <ul className={styles.legal__list}>
              <li className={styles.legal__item}>
                <u>Personal Data collected:</u> user data, usage data
              </li>
              <li className={styles.legal__item}>
                <u>Duration:</u> 6 months
              </li>
            </ul>
            <p className={styles.legal__sub_title}>Reporting and Analytics</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can
              negatively impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser
              controls, often found in your browser's "Tools" or "Preferences" menu. For more information on how to modify your
              browser settings or how to block, manage or filter cookies can be found in your browser's help file or through the
              sites like{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer" className={styles.legal__link}>
                this.
              </a>
            </p>
            <p className={styles.legal__paragraph}>
              Additionally, please note that blocking cookies may not completely prevent how we share information with third
              parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by
              these parties, please follow the instructions in the "Behavioral Advertising" section above.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              <b>Do Not Track</b>
            </p>
            <p className={styles.legal__paragraph}>
              Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals,
              we do not alter our data collection and usage practices when we detect such a signal from your browser.
            </p>
            <p className={styles.legal__sub_title}>Changes</p>
            <p className={styles.legal__paragraph}>
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or
              for other operational, legal, or regulatory reasons.
            </p>
            <p className={styles.legal__sub_title}>Complaints</p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              As noted above, if you would like to make a complaint, please contact us by e-mail or by mail using the details
              provided under "Contact" above.
            </p>
            <p className={`${styles.legal__paragraph} ${styles.legal__paragraph_top_padding}`}>
              If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the
              relevant data protection authority.
            </p>
            <p className={styles.legal__paragraph}>
              UK:{" "}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer" className={styles.legal__link}>
                link.
              </a>
            </p>
            <p className={styles.legal__paragraph}>
              <i>Last updated: 23 September 2022</i>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
