import { Text } from '../../components';
import DevCard from './DevCard';

export default function About() {
    return (
        <>
            <div className="about">
                <Text as="h2" className="h2">
                    About us
                </Text>
                <div className="team">
                    <Text as="h3" className="h3">
                        We are the Scientia Appetitus team. For last two months we have been turning all our acquired
                        knowledge, skills and abilities into this beautiful project. We tried to choose a non-standard
                        topic for the final project, which could solve a practical problem. All this time we were in
                        contact, called, communicated and solved problems together.
                    </Text>
                    <Text as="h3" className="h3">
                        Scientia Appetitus is:
                    </Text>
                </div>
                <div className="devs-wrapper">
                    <DevCard
                        imgURL="../../images/dev-1.jpg"
                        name="Sergey Tsepodoy"
                        title="Team Lead, Frontend Developer"
                        bio="I graduated with a degree in Computer Science. I have been studying frontend development
                            since November 2023"
                        contributions={[
                            'Added development scripts, set up repository and Trello environment',
                            'Set up Jest and perform test suites for entire project',
                            'Developed Main, About Us, Product details, Cart pages',
                            'Implemented Slider and Zoom in Product details page',
                            'Added Pull Request Template',
                        ]}
                        github="sergiozeppo"
                    />
                    <DevCard
                        imgURL="../../images/dev-2.jpg"
                        name="Vitaly Kim"
                        title="Frontend Developer"
                        bio="I graduated with a degree in Computer Science. I have been studying frontend development
                            since May 2023"
                        contributions={[
                            'Added development scripts and set up repository',
                            'Translated Commerce Tools Docs for normal people',
                            'Added comphensive README to the project',
                            'Developed Catalog, Login, Cart pages',
                            'Set up products filtering, sorting and searching',
                        ]}
                        github="ki8vi"
                    />
                    <DevCard
                        imgURL="../../images/dev-3.jpg"
                        name="Kirill Parfenov"
                        title="Frontend Developer"
                        bio="I currently studying Computer Science. I have been studying frontend development
                            since November 2023"
                        contributions={[
                            'Added development scripts and set up repository',
                            'Set up Commerce Tools Profile for project',
                            'Developed Registration, Profile, Password change and Cart pages',
                            'Set up inputs validation',
                            'Implemented Infinite Scroll on the Catalog page',
                            'Set up Routing',
                        ]}
                        github="izeevens"
                    />
                </div>
            </div>
        </>
    );
}
