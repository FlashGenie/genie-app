import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const AboutProfileBox = ({ name, role, imgLink, gitHubLink, linkedinLink }) => {

    const hoverEffect = "transition ease-in-out delay-150 hover:-translate-y-2 duration-300 hover:shadow-lg";

    return (
        <div className={`flex h-[180px] w-[370px] mx-[20px] px-5 py-4 bg-[#FCFCFC] rounded-lg border shadow-md ${hoverEffect}`}>
            <div className="flex flex-col justify-between h-full w-full">
                <div>
                    <h4 className="text-2xl font-medium">{name}</h4>
                    <p className="text-gray-400">{role}</p>
                </div>
                <div className="flex w-full mb-1">
                    <a href={gitHubLink} className="h-[40px] w-[40px] rounded-full p-1.5 border mr-3" >
                        <IoLogoGithub className="h-full w-full text-gray-800" />
                    </a>
                    <a href={linkedinLink} className="h-[40px] w-[40px] rounded-full p-2 border" >
                        <FaLinkedin className="h-full w-full text-gray-800" />
                    </a>
                </div>
            </div>
            <div className="h-full w-[120px] mt-1">
                <div className="h-[120px] w-[120px]">
                    <img className="rounded-md" src={imgLink} />
                </div>
            </div>
        </div>
    );
};

export default AboutProfileBox;