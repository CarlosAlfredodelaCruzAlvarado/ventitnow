'use client'
import React, { useState, useEffect } from 'react';
import NavBarLegal from './NavBarLegal';
import Link from  'next/link';

const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('About');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    if (tab) {
      switch (tab.toLowerCase()) {
        case 'about':
          setActiveTab('About');
          break;
        case 'terms':
          setActiveTab('Terms & Conditions');
          break;
        case 'privacy':
          setActiveTab('Privacy Policy');
          break;
        case 'faq':
          setActiveTab('FAQ');
          break;
        default:
          setActiveTab('About');
      }
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return <About setActiveTab={setActiveTab} />;
      case 'Terms & Conditions':
        return <Terms setActiveTab={setActiveTab} />;
      case 'Privacy Policy':
        return <PrivacyPolicy />;
      case 'FAQ':
        return <FAQ />;
      default:
        return <About setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBarLegal />

      <div className="flex flex-1">
        <div className="w-1/6 bg-black p-6">
          <ul className="space-y-4">
            <li
              className={`cursor-pointer ${activeTab === 'About' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-400'}`}
              onClick={() => setActiveTab('About')}
            >
              About
            </li>
            <li
              className={`cursor-pointer ${activeTab === 'Terms & Conditions' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-400'}`}
              onClick={() => setActiveTab('Terms & Conditions')}
            >
              Terms & Conditions
            </li>
            <li
              className={`cursor-pointer ${activeTab === 'Privacy Policy' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-400'}`}
              onClick={() => setActiveTab('Privacy Policy')}
            >
              Privacy Policy
            </li>
            <li
              className={`cursor-pointer ${activeTab === 'FAQ' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-400'}`}
              onClick={() => setActiveTab('FAQ')}
            >
              FAQ
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6 bg-black mr-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Components for each section
const About = ({ setActiveTab }) => (
  <div className='text-justify'>
    <h1 className='font-bold'>About VentItNow!</h1>
    <br />
    <h3>Welcome to VentItNow!, your go-to platform for sharing your negative experiences with products and services. Our mission is to empower consumers by giving them a voice to express their frustrations, provide feedback, and help others make informed decisions.</h3>
    <br />
    <h2 className='font-bold'>Our Mission</h2>
    <h3>At VentItNow!, we believe that every consumer deserves to be heard. Whether it's a faulty product, poor customer service, or misleading advertising, your experiences matter. We aim to create a transparent environment where consumers can share their stories, and companies can learn from them to improve their offerings.</h3>
    <br />
    <h2 className='font-bold'>Why VentItNow! Exists</h2>
    <h3>We understand how frustrating it can be when a product or service doesn’t live up to expectations. VentItNow! was born out of the need for a space where consumers can openly discuss their grievances without fear of censorship or judgment. By providing this platform, we hope to foster better consumer-company relationships and drive improvements in the market.</h3>
    <br />
    <h2 className='font-bold'>What We Offer</h2>
    <ul className='ml-6'>
      <li className='list-disc'>Consumer Feedback: Share your experiences and help others avoid the same pitfalls.</li>
      <li className='list-disc'>Community Support: Connect with others who have faced similar issues and learn from their experiences.</li>
    </ul>
    <br />
    <h2 className='font-bold'>Our Vision</h2>
    <h3>We envision a world where consumer feedback is not only welcomed but actively sought out by companies looking to improve. VentItNow! strives to be the leading platform for consumer advocacy, ensuring that your voice is heard and that your concerns are addressed.</h3>
    <br />
    <h2>Thank you for being a part of our community. Together, we can make a difference.</h2>
  </div>
);

const Terms = ({ setActiveTab }) => (
  <div className='text-justify'>
    <h1 className='font-bold'>Terms & Conditions</h1>
    <br />
    <h3>Welcome to VentItNow! These terms and conditions outline the rules and regulations for the use of our website, located at <span className='text-blue-600 cursor-pointer'><Link href="/">VentItAllNow.com</Link></span>. By accessing this website, we assume you accept these terms and conditions. Do not continue to use VentItNow! if you do not agree to all the terms and conditions stated on this page.</h3>
    <br />
    <h2 className='font-bold'>1. Use of the Site</h2>
    <h3>You must be at least 18 years old to use this site. By using VentItNow!, you confirm that you are of legal age to form a binding contract.</h3>
    <h3>The content on this site is for your general information and use only. It is subject to change without notice.</h3>
    <h3>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</h3>
    <br />
    <h2 className='font-bold'>User-Generated Content</h2>
    <h3>By submitting content to VentItNow!, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content.</h3>
    <h3>You agree not to post content that is unlawful, defamatory, obscene, harassing, or otherwise objectionable. We reserve the right to remove any content that violates these terms or is otherwise inappropriate at our sole discretion.</h3>
    <h3>You retain ownership of your content, but you grant VentItNow! the right to make it available to other users of the site and to edit or delete your content if necessary.</h3>
    <br />
    <h2 className='font-bold'>3. Privacy Policy</h2>
    <h3>Your privacy is important to us. Please review our <span className='text-blue-600 cursor-pointer' onClick={() => setActiveTab('Privacy Policy')}>Privacy Policy</span> to understand how we collect, use, and protect your personal information.</h3>
    <h3>By using this site, you consent to the collection and use of your information as described in our Privacy Policy.</h3>
    <br />
    <h2 className='font-bold'>4. Disclaimers and Limitation of Liability</h2>
    <h3>The information on VentItNow! is provided on an "as is" basis. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.</h3>
    <h3>VentItNow! will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this site.</h3>
    <br />
    <h2 className='font-bold'>5. Modifications</h2>
    <h3>VentItNow! reserves the right to modify these terms and conditions at any time. It is your responsibility to review these terms regularly. Your continued use of the site after any modifications indicates your acceptance of the new terms.</h3>
  </div>
);

const PrivacyPolicy = () => (
  <div className='text-justify'>
    <h1 className='font-bold'>Privacy Policy</h1>
    <br />
    <h3>VentItNow! ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <span className='text-blue-600 cursor-pointer'><Link href="/">VentItAllNow.com</Link></span>. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</h3>
    <br/>
    <h2 className='font-bold'>1. Information We Collect</h2>
    <h3>Personal Data: We may collect personally identifiable information, such as your name, email address, and contact details, when you voluntarily submit it to us, for example, when you register for an account, submit content, or subscribe to our newsletter.</h3>
    <h3>Non-Personal Data: We may also collect non-personal information, such as anonymous usage data, referring/exit pages, and URLs, platform types, and the number of clicks.</h3>
    <h3>Cookies: We use cookies to collect information. Cookies are small data files stored on your device by your browser. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our site.</h3>
    <br />
    <h2 className='font-bold'>2. How We Use Your Information</h2>
    <h3>To Provide Services: We use the information we collect to operate, maintain, and provide you with the features and functionality of the site.</h3>
    <h3>To Improve Our Site: We may use the information to understand and analyze the usage trends and preferences of our users to improve the site.</h3>
    <h3>To Communicate: We may use your email address to send you updates, newsletters, and promotional offers. You can opt out of receiving these communications at any time.</h3>
    <br />
    <h2 className='font-bold'>3. How We Share Your Information</h2>
    <h3>With Your Consent: We may share or disclose your information with your consent, for example, when you agree to our sharing your information with third parties for their marketing purposes.</h3>
    <h3>Third-Party Service Providers: We may share information with third-party service providers that help us operate our site, process payments, or provide other services to us.</h3>
    <h3>Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.</h3>
    <br />
    <h2 className='font-bold'>4. Security of Your Information</h2>
    <h3>We use administrative, technical, and physical security measures to protect your personal information. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</h3>
    <br/>
    <h2 className='font-bold'>5. Your Data Protection Rights</h2>
    <h3>Depending on your location, you may have the following rights regarding your personal data:</h3>
    <ul className='ml-6'>
      <li className='list-disc'>The right to access – You have the right to request copies of your personal data.</li>
      <li className='list-disc'>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
      <li className='list-disc'>The right to erasure – You have the right to request that we erase your personal data under certain conditions.</li>
    </ul>
    <br/>
    <h2 className='font-bold'>6. Changes to This Privacy Policy</h2>
    <h3>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</h3>
    <br/>
    <h2 className='font-bold'>7. Contact Us</h2>
    <h3>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:your.email@example.com" className='text-blue-600 underline'>your.email@example.com</a>.</h3>
  </div>
);

const FAQ = ({ setActiveTab }) => (
  <div className="text-justify">
    <h1 className="font-bold">Frequently Asked Questions (FAQ)</h1>
    <br />

    <h2 className="font-bold">1. What is VentItNow!?</h2>
    <h3>VentItNow! is a platform where users can share their negative experiences with products or services. Our goal is to provide a space where consumers can express their frustrations, provide feedback, and help others make informed decisions.</h3>
    <br />

    <h2 className="font-bold">2. How do I post a complaint?</h2>
    <h3>To post a complaint, click on the "Post Your VIAN" button on the main page. Fill out the form with all the necessary details about your experience, and submit it. Your complaint will be reviewed before being published.</h3>
    <br />

    <h2 className="font-bold">3. Is there a cost to use VentItNow!?</h2>
    <h3>No, using VentItNow! is completely free. We believe that everyone should have the right to share their experiences without any barriers.</h3>
    <br />

    <h2 className="font-bold">4. Can I remain anonymous?</h2>
    <h3>Yes, you can choose to post your complaint anonymously. Simply select the option to remain anonymous when you submit your complaint.</h3>
    <br />

    <h2 className="font-bold">5. How is my personal information protected?</h2>
    <h3>We take your privacy seriously. Please refer to our <span className='text-blue-600 cursor-pointer' onClick={() => setActiveTab('Privacy Policy')}>Privacy Policy</span> to learn more about how we protect your information.</h3>
    <br />

    <h2 className="font-bold">6. How do I contact VentItNow! support?</h2>
    <h3>If you need assistance or have any questions, please contact us at <a href="mailto:your.email@example.com" className='text-blue-600 underline'>your.email@example.com</a>.</h3>
  </div>
);


export default LegalPage;
