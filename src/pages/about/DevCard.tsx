import GithubIcon from './GithubIcon';

type DevCardProps = {
    imgURL: string;
    name: string;
    title: string;
    bio: string;
    contributions: string[];
    github: string;
};

export default function DevCard(dev: DevCardProps) {
    return (
        <div className="devs-card-info-wrapper">
            <div className="dev-avatar">
                <div className="round-avatar">
                    <img className="dev-photo" src={dev.imgURL} />
                </div>
            </div>
            <p className="dev-name">{dev.name}</p>
            <p className="dev-title">{dev.title}</p>
            <p className="dev-bio">{dev.bio}</p>
            <ul className="contributions">
                {dev.contributions.map((li) => {
                    return <li>{li}</li>;
                })}
                {/* <li>Added development scripts and set up repository</li>
                <li>Set up Jest and perform test suites for entire project</li>
                <li>Developed main, about us, products details pages</li>
                <li>Implemented interactive product cards</li>
                <li>Set up router (Navigo library)</li> */}
            </ul>
            <a href={'https://github.com/' + dev.github} target="_blank">
                <GithubIcon />
            </a>
        </div>
    );
}
