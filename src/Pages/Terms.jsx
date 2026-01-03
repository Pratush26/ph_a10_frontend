import { Link } from "react-router"

const terms = [
    {
        title: "Acceptance of Terms",
        subtitle: "By accessing and using PlateShare, you agree to be bound by these Terms and Conditions.",
        list: [
            { item: "Your use constitutes acceptance of all terms" },
            { item: "If you disagree, you may not access our services" },
            { item: "Terms apply to all users (donors, receivers, visitors)" }
        ]
    },
    {
        title: "User Eligibility",
        subtitle: "Requirements to create and maintain a PlateShare account",
        list: [
            { item: "Must be at least 18 years old" },
            { item: "Must provide accurate registration information" },
            { item: "Responsible for maintaining account security" },
            { item: "May not create multiple accounts without permission" },
            { item: "Must comply with local laws and regulations" }
        ]
    },
    {
        title: "Food Donation Guidelines",
        subtitle: "Rules and responsibilities for food donors",
        list: [
            { item: "All donated food must be safe for human consumption" },
            { item: "Clearly state expiration dates and storage requirements" },
            { item: "Accurately describe quantity, condition, and packaging" },
            { item: "Maintain proper food handling and hygiene standards" },
            { item: "Disclose any allergens or special handling requirements" },
            { item: "Remove listings promptly if food becomes unsafe or expired" },
            { item: "Home-cooked meals must follow local food safety guidelines" }
        ]
    },
    {
        title: "Food Request & Collection",
        subtitle: "Responsibilities for food receivers",
        list: [
            { item: "Verify food condition and safety upon collection" },
            { item: "Use donations for intended, non-commercial purposes" },
            { item: "Collect items within agreed-upon timeframe" },
            { item: "Communicate promptly about schedule changes" },
            { item: "Not to resell donated items for profit" },
            { item: "Respect donors' time and property during pickup" }
        ]
    },
    {
        title: "User Conduct & Prohibited Activities",
        subtitle: "Behavior that is not permitted on PlateShare",
        list: [
            { item: "Listing unsafe, expired, or contaminated food" },
            { item: "Making false or misleading requests" },
            { item: "Harassing, threatening, or abusing other users" },
            { item: "Commercial resale of donated items" },
            { item: "Misrepresenting identity or intentions" },
            { item: "Violating any applicable local, state, or federal laws" },
            { item: "Sharing inappropriate or offensive content" }
        ]
    },
    {
        title: "Privacy & Data Usage",
        subtitle: "How we handle your information",
        list: [
            { item: "We collect necessary data for platform operation" },
            { item: "User contact information may be shared between matched parties" },
            { item: "Location data is used for proximity matching only" },
            { item: "We do not sell your personal data to third parties" },
            { item: "Review our complete Privacy Policy for detailed information" }
        ]
    },
    {
        title: "Liability Disclaimer",
        subtitle: "Important limitations of our responsibility",
        list: [
            { item: "PlateShare provides a matching platform only" },
            { item: "We do not verify every food item listed" },
            { item: "Users interact and exchange food at their own risk" },
            { item: "We are not liable for user disputes or disagreements" },
            { item: "Food safety is the sole responsibility of users" },
            { item: "We recommend following all local food safety guidelines" }
        ]
    },
    {
        title: "Account Management",
        subtitle: "Account suspension, termination, and user rights",
        list: [
            { item: "Users may delete their account at any time" },
            { item: "PlateShare may suspend accounts for terms violations" },
            { item: "Termination may occur for repeated safety violations" },
            { item: "Fraudulent activity will result in immediate termination" },
            { item: "Users may appeal suspension decisions via support email" }
        ]
    },
    {
        title: "Platform Modifications",
        subtitle: "Changes to terms and services",
        list: [
            { item: "Terms may be updated periodically" },
            { item: "Continued use constitutes acceptance of changes" },
            { item: "Major changes will be notified via email" },
            { item: "Users should review terms regularly" },
            { item: "Historical versions available upon request" }
        ]
    },
    {
        title: "Emergency Procedures",
        subtitle: "What to do in case of food safety concerns",
        list: [
            { item: "Stop consumption immediately if safety is suspected" },
            { item: "Seek medical attention if illness occurs" },
            { item: "Contact local health authorities if needed" },
            { item: "Report immediately to PlateShare support" },
            { item: "Preserve evidence if possible for investigation" }
        ]
    },
    {
        title: "Contact & Support",
        subtitle: "How to reach us with questions or concerns",
        list: [
            { item: "Email: support@plateshare.org" },
            { item: "Phone: 1-800-PLATE-SHARE (1-800-752-8374)" },
            { item: "Address: 123 Food Security Avenue, Community City" },
            { item: "Response time: Within 24-48 hours for urgent matters" },
            { item: "Business hours: 9 AM - 6 PM, Monday through Friday" }
        ]
    }
]

export default function Terms() {
    return (
        <main className="my-12 w-full">
            <h1 className="text-3xl font-bold text-emerald-950 text-center mb-10">Terms & Conditions</h1>
            <dl className="w-5/6 mx-auto text-start space-y-3">
                {
                    terms?.map((e, i) => (
                        <div key={i} className="space-y-3 my-5">
                            <dt className="font-bold text-xl capitalize text-emerald-950">• {e.title}:</dt>
                            <dd className="text-gray-800 text-sm font-medium ml-4">
                                <h5>{e.subtitle}</h5>
                                <ul className="list-disc list-inside space-y-2 my-2">
                                {
                                    e.list?.map((item, id) => (
                                        <li key={id}>{item.item}</li>
                                    ))
                                }
                                </ul>
                            </dd>
                        </div>
                    ))
                }
                <div className="space-y-3 my-5">
                    <dt className="font-bold text-xl capitalize text-emerald-950">• Contact Us:</dt>
                    <dd className="text-gray-800 text-sm font-medium ml-4">
                        <p>If you have any questions about these Terms, please contact us at:</p>
                        <div className="flex flex-col gap-1 my-1 text-sm">
                            <Link className="hover:text-gray-600 trnsition" to='/'>support@Plateshare.com</Link>
                            <Link className="hover:text-gray-600 trnsition" to='/'>+880 123 456 789</Link>
                        </div>
                    </dd>
                </div>
            </dl>
        </main>)
}