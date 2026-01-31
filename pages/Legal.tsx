
import React from 'react';
import { Scale, ShieldCheck, FileText } from 'lucide-react';

const LegalLayout: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, icon, children }) => (
    <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-[#333] text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-md mb-6 text-[#FDB913]">
                    {icon}
                </div>
                <h1 className="font-lemon text-4xl md:text-6xl mb-4">{title}</h1>
                <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">{subtitle}</p>
                <div className="mt-8 inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-mono text-gray-400 border border-white/20">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl -mt-12 relative z-20">
            <div className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-gray-100">
                <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#333] prose-headings:mt-12 prose-headings:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-[#F47C20] prose-a:no-underline hover:prose-a:underline">
                    {children}
                </article>
            </div>
        </div>
    </div>
);

export const PrivacyPolicy: React.FC = () => (
    <LegalLayout 
        title="Privacy Policy" 
        subtitle="Your privacy is important to us. Here is how we protect your data."
        icon={<ShieldCheck size={40} />}
    >
        <h3 className="text-2xl text-[#F47C20]">1. Introduction</h3>
        <p>
            Welcome to YGPT (Youth For Global Peace and Transformation). We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>
        
        <h3 className="text-2xl text-[#F47C20]">2. Data We Collect</h3>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and date of birth.</li>
            <li><strong>Contact Data:</strong> includes email address, telephone numbers, and physical address for event coordination.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting, and operating system.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, clubs, LMS, and services.</li>
        </ul>

        <h3 className="text-2xl text-[#F47C20]">3. How We Use Your Data</h3>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li>To register you as a new club member or volunteer.</li>
            <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
            <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data).</li>
            <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
        </ul>

        <h3 className="text-2xl text-[#F47C20]">4. Data Security</h3>
        <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
            In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. 
            They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
        </p>
        
        <h3 className="text-2xl text-[#F47C20]">5. Third-Party Links</h3>
        <p>
            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. 
            We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
        </p>

        <h3 className="text-2xl text-[#F47C20]">6. Contact Us</h3>
        <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:privacy@ygpt.org">privacy@ygpt.org</a>.
        </p>
    </LegalLayout>
);

export const TermsOfService: React.FC = () => (
    <LegalLayout 
        title="Terms of Service" 
        subtitle="The rules and regulations for using our platform."
        icon={<Scale size={40} />}
    >
        <h3 className="text-2xl text-[#936FB1]">1. Acceptance of Terms</h3>
        <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. 
            Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h3 className="text-2xl text-[#936FB1]">2. Description of Service</h3>
        <p>
            YGPT provides a platform for youth to engage in peace-building activities, join clubs, access educational content (LMS), and participate in community events. 
            You are responsible for obtaining access to the Service and that access may involve third party fees (such as Internet service provider or airtime charges). 
            In addition, you must provide and be responsible for all equipment necessary to access the Service.
        </p>

        <h3 className="text-2xl text-[#936FB1]">3. User Conduct</h3>
        <p>You agree to use the site only for lawful purposes. As a community focused on peace and transformation, you are prohibited from posting on or transmitting through the Site any:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li>Unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.</li>
            <li>Material that encourages conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any applicable local, state, national, or international law.</li>
            <li>Content that infringes on the intellectual property rights of others.</li>
        </ul>
        
        <h3 className="text-2xl text-[#936FB1]">4. Intellectual Property</h3>
        <p>
            The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights. 
            The copying, redistribution, use or publication by you of any such matters or any part of the Site, except as allowed by specific license, is strictly prohibited. 
            You do not acquire ownership rights to any content, document or other materials viewed through the Site.
        </p>

        <h3 className="text-2xl text-[#936FB1]">5. User-Generated Content</h3>
        <p>
            By submitting content (fan art, testimonials, forum posts) to YGPT, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute it in any media. 
            You represent and warrant that you own or have the necessary rights to the content you submit and that its posting does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
        </p>

        <h3 className="text-2xl text-[#936FB1]">6. Termination</h3>
        <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. 
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
        </p>
        
        <h3 className="text-2xl text-[#936FB1]">7. Governing Law</h3>
        <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. 
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </p>
    </LegalLayout>
);

export const CookiePolicy: React.FC = () => (
    <LegalLayout 
        title="Cookie Policy" 
        subtitle="Understanding how we use cookies to improve your experience."
        icon={<FileText size={40} />}
    >
         <h3 className="text-2xl text-[#00A651]">1. What Are Cookies</h3>
         <p>
             As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. 
             This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. 
             We will also share how you can prevent these cookies from being stored, although this may downgrade or 'break' certain elements of the site's functionality.
         </p>

         <h3 className="text-2xl text-[#00A651]">2. How We Use Cookies</h3>
         <p>
             We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. 
             It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
         </p>

         <h3 className="text-2xl text-[#00A651]">3. The Cookies We Set</h3>
         <ul className="list-disc pl-6 space-y-2">
             <li>
                 <strong>Account related cookies:</strong> If you create an account with us, we will use cookies for the management of the signup process and general administration.
             </li>
             <li>
                 <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
             </li>
             <li>
                 <strong>Forms related cookies:</strong> When you submit data through a form such as contact pages or comment forms, cookies may be set to remember your user details for future correspondence.
             </li>
         </ul>

         <h3 className="text-2xl text-[#00A651]">4. Third Party Cookies</h3>
         <p>
             In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
         </p>
         <ul className="list-disc pl-6 space-y-2">
             <li>
                 This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.
             </li>
             <li>
                 From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site.
             </li>
         </ul>

         <h3 className="text-2xl text-[#00A651]">5. Disabling Cookies</h3>
         <p>
             You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). 
             Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site.
         </p>
    </LegalLayout>
);
