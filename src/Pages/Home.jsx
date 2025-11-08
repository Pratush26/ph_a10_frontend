import '../Utils/utility.css'

export default function HomePage() {
    return (
        <main className="w-full">
            <section id="hero" className="w-full relative min-h-[70vh] z-10 grid grid-cols-2 items-center-safe text-white">
                <div className="w-full min-h-[70vh] absolute z-3 mix-blend-darken bg-linear-to-r from-transparent from-10% via-gray-600 via-30% to-black"></div>
                <span id="banner"></span>
                <div></div>
                <div className="relative z-10 w-11/12 space-y-3">
                    <h1 className="text-3xl font-bold">Turn Surplus Food into Hope for Those in Need</h1>

                    <p className="text-sm text-gray-400">Join our mission to rescue perfectly good food from going to waste and deliver it to families facing hunger. Every donation feeds a soul and saves our planet.</p>

                    <ul className="list-disc list-inside text-gray-300">
                        <li>1.3 Billion Tons of Food Wasted Yearly</li>
                        <li>820 Million People Go Hungry Daily</li>
                    </ul>
                    <div className="flex gap-4">
                        <button className="btn border-none trnsition shadow-none">Donate Food Now</button>
                        <button className='btn-out trnsition'>Become a Volunteer</button>
                    </div>
                </div>
            </section>
        </main>
    )
}