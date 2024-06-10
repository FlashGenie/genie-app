function MainPage() {
    return(
        <>
            <div className="flex flex-col items-center font-sans">
                <h1 className="font-bold w-3/4 text-[5rem] text-center leading-10 pt-32">AI-Powered Flashcards <img src="../../public/flashcard.svg" className="inline"/> from your notes, made effortless</h1>
                <h2 className="text-gray-600 pt-10 pb-5">Create, Study, Explore, and Share: A Community of Flashcards</h2>
                <button className="bg-black text-white px-3 py-1 rounded-md">Get started</button>
            </div>
        </>
    )
}

export default MainPage;