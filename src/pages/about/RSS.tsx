import { Text } from '../../components';

export default function RSS() {
    return (
        <div className="RSS-block">
            <Text as="h2" className="h2 RSS">
                Special thanks to:
            </Text>
            <div>
                <a href="https://rs.school/courses/javascript-ru" target="_blank">
                    <img className="rss-logo" />
                </a>
            </div>
            <div className="div-content">
                <Text as="h3" className="h3 RSS">
                    RS School offers a unique learning experience as a free, community-based online education
                    initiative. The RS School has been run by the Rolling Scopes community since 2013. Today, over 600
                    developer-volunteers from various countries and companies assist as mentors. We believe in important
                    ideas that guide our mission.
                </Text>
            </div>
        </div>
    );
}
