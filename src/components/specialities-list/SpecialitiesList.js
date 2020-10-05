import React from 'react';
import "./specialities-list.scss";
import SpecialityLink from "../speciality-link/SpecialityLink";
import MindReading from "../svg/MindReading";
import DepressedMan from "../svg/DrepressedMan";
import MirrorMe from "../svg/MirrorMe";
import ProblemWithMe from "../svg/ProblemWithMe";
import BlockedThinking from "../svg/BlockedThinking";
import StarsView from "../svg/StarsView";
const SpecialitiesList = () => {
    return (
        <div className={"specialities-list"}>
            <SpecialityLink  title="Astrology & Horoscopes" link={"/"} icon={<StarsView/>}/>

            <SpecialityLink title={"Career Advice"}  link={"/"} icon={<BlockedThinking/>}/>
            <SpecialityLink title={"Career Advice"} link={"/"} icon={<ProblemWithMe/>}/>
            <SpecialityLink title={"Clairvoyance"} link={"/"} icon={<MirrorMe/>}/>
            <SpecialityLink title={"Psychic Reading"} link={"/"} icon={<DepressedMan/>}/>
            <SpecialityLink title={"Dream Analysis"} link={"/"} icon={<MindReading/>}/>
        </div>
    );
};

export default SpecialitiesList;
