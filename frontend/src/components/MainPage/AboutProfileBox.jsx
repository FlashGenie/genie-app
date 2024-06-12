import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const AboutProfileBox = ({ name, role, imgLink, gitHubLink, linkedinLink }) => {
  return (
    <div className="flex h-[210px] w-[350px] mx-[20px] pt-[20px] pl-[30px] pr-[30px] pb-[30px] bg-zinc-50 rounded-xl border shadow-xl">
        <div className="flex flex-col justify-between h-full w-full">
            <div>
                <h4 className="text-[22px] font-medium">{name}</h4>
                <p className="text-gray-600">{role}</p>
            </div>
            <div className="flex h-[60px] w-full">
                <a href={gitHubLink} className="h-[40px] w-[40px] mt-[10px] mr-[10px] mb-[10px]" >
                    <IoLogoGithub className="h-full w-full" />
                </a>
                <a href={linkedinLink} className="h-[40px] w-[40px] m-[10px]" >
                    <FaLinkedin className="h-full w-full" />
                </a>
            </div>
        </div>
        <div className="h-full w-[120px]">
            <div className="h-[100px] w-[100px] mt-[10px]">
                <img src={imgLink} />
            </div>
        </div>
    </div>
  );
};

export default AboutProfileBox;