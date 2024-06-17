function Product() {
    return(
        <section id="product" className='py-20 pt-32'>
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-5xl font-medium mb-3 text-center">
                    Transform Your Notes into Flashcards with <span className="font-extrabold">Genie.</span>
                </h2>
                <p className="w-2/3 text-gray-600 text-2xl font-light tracking-wider text-center mb-4">
                    Users can create flashcard decks using AI, customize them to their liking, and search through existing decks created by other users.
                </p>
            </div>
            <div className="mx-auto grid gap-6 lg:grid-cols-3 items-start max-w-none">

                {/* 1st item */}
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border shadow-xl h-full">
                    <div className="py-6">
                      <img className="w-[300px] h-[200px]" src="step1.png"/>
                    </div>
                    <h4 className="text-xl font-bold mb-1.5">Step 1. Upload</h4>
                    <p className="text-gray-600 text-center">Snap a photo, upload an image, or provide a PDF our AI will transform it into flashcards instantly!</p>
                </div>

                {/* 2nd item */}
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border shadow-xl h-full">
                    <div className="py-6">
                      <img className="w-[300px] h-[200px]" src="step2.png"/>
                    </div>
                    <h4 className="text-xl font-bold mb-1.5">Step 2. Study</h4>
                    <p className="text-gray-600 text-center">Review your flashcards, customize them as needed, and start studying using the flashcard study mode.</p>
                </div>


                {/* 3rd item */}
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border shadow-xl h-full">
                    <div className="py-6">
                      <img className="w-[300px] h-[200px]" src="step3.png"/>
                    </div>
                    <h4 className="text-xl font-bold mb-1.5">Step 3. Share</h4>
                    <p className="text-gray-600 text-center">Easily share your flashcards and explore flashcards shared by other users. Join a community of learners.</p>
                </div>

            </div>

        </section>
    )
}

export default Product;