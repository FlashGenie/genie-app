import AboutProfileBox from "./AboutProfileBox";

function About() {
    return(
        <section id="about-section" className="flex flex-col justify-between h-[750px] w-full pt-20">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-5xl font-medium mb-3 text-center">About Us</h2>
                <p className="text-gray-600 pb-5 text-2xl font-light tracking-wider text-center mb-4 max-w-[700px]">
                    Meet the team, who brings a diverse and global perspective to the project.(update this paragraph in about.jsx)
                </p>
            </div>

            <div className="flex flex-col h-full w-full">
                <div className="flex justify-center items-center h-full w-full">
                    {/* 1st profile */}
                    <AboutProfileBox
                        name={"Charles Racine"}
                        role={"Back-end"}
                        imgLink={"./../../../public/profile-default-img.png"}
                        gitHubLink={"https://github.com/cracine79"}
                        linkedinLink={"https://www.linkedin.com/in/charlee-racine-50241a7b/"}
                    />
                    {/* 2nd profile */}
                    <AboutProfileBox
                        name={"Edison Li"}
                        role={""}
                        imgLink={"./../../../public/profile-default-img.png"}
                        gitHubLink={"https://github.com/edison4354"}
                        linkedinLink={"https://www.linkedin.com/in/edison-l-832242167/"}
                    />
                    {/* 3rd profile */}
                    <AboutProfileBox
                        name={"Jaspreet Singh"}
                        role={"Front-end"}
                        imgLink={"./../../../public/profile-default-img.png"}
                        gitHubLink={"https://github.com/jsingh0507"}
                        linkedinLink={"https://www.linkedin.com/in/rafael-campos-60471a2b2/"}
                    />
                </div>
                <div className="flex justify-center items-center h-full w-full pr-30" >
                    {/* 4th profile */}
                    <AboutProfileBox
                        name={"Rafael Campos"}
                        role={"Back-end"}
                        imgLink={"./../../../public/profile-default-img.png"}
                        gitHubLink={"https://github.com/Rafa-Camp04"}
                        linkedinLink={"https://www.linkedin.com/in/rafael-campos-60471a2b2/"}
                    />
                    {/* 5th profile */}
                    <AboutProfileBox
                        name={"Dharani Yedavelly"}
                        role={"Front-end"}
                        imgLink={"./../../../public/profile-default-img.png"}
                        gitHubLink={"https://github.com/dyedavelly"}
                        linkedinLink={"https://www.linkedin.com/in/dharaniy/"}
                    />          
                </div>
            </div>

        </section>
    )
}

export default About;