

function About() {
    return(
        <section id="about-section" className="flex flex-col justify-between h-[750px] w-full pt-20">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-5xl font-medium mb-3 text-center">About Us</h2>
                <p className="text-gray-600 pb-5 text-2xl font-light tracking-wider text-center mb-4 max-w-[700px]">
                Lorem ipsum dolor sit amet. Non fugiat exercitationem et temporibus sequi eum magnam consequatur aut eius ratione.
                </p>
            </div>

            <div className="flex justify-left h-[500px]">
                <div className="flex justify-left h-full w-full min-w-[300px] max-w-[700px]">
                    <div className="h-full w-full p-[40px] rounded-xl border shadow-xl">
                        <h3 className="text-[32px] font-small mb-[30px]">
                            Lorem ipsum dolor sit amet. Non fugiat exercitationem et suscipit aspernatur
                        </h3>
                        <p className="text-gray-600 text-[18px] mb-[20px]">
                            Lorem ipsum dolor sit amet. Aut velit harum qui dolor minima et temporibus 
                            sequi eum magnam consequatur aut eius ratione. Est unde vitae nam distinctio 
                            harum quo ipsam voluptatum aut galisum aliquam. Quo sequi voluptas et expedita 
                            enim sit sapiente recusandae et suscipit ipsum sed molestias saepe in natus labore.
                        </p>

                        <p className="text-gray-600 text-[18px]">
                            Lorem ipsum dolor sit amet. Aut velit harum qui dolor minima et temporibus 
                            sequi eum magnam consequatur aut eius ratione. Est unde vitae nam distinctio 
                            harum quo ipsam voluptatum aut galisum aliquam. Quo sequi voluptas et expedita 
                            enim sit sapiente recusandae et suscipit ipsum sed molestias saepe in natus labore.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col h-full w-full max-w-[580px]">
                    <div className="flex justify-center items-center h-full w-full">
                        <div className="h-[210px] w-[150px] mx-[20px] bg-gray-100 rounded-xl border shadow-xl">

                        </div>
                        <div className="h-[210px] w-[150px] mx-[20px] bg-gray-100 rounded-xl shadow-xl">

                        </div>
                        <div className="h-[210px] w-[150px] mx-[20px] bg-gray-100 shadow-xl">

                        </div>
                    </div>
                    <div className="flex justify-evenly items-center h-full w-full pr-30" >
                        <div className="h-[210px] w-[150px] mx-[20px] bg-gray-100 border shadow-xl">

                        </div>
                        <div className="h-[210px] w-[150px] mx-[20px] bg-gray-100">

                        </div>             
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About;