import { Img } from '../Img';
import { Text } from '../Text';

export default function DownloadApp() {
    return (
        <div className="container-xs">
            <div className="download-wrapper">
                <Text as="h2" className="app-store">
                    Download Explore KZ App!
                </Text>
                <div className="app-store-wrapper">
                    <Img src="/images/google-play-logo.png" alt="google play badge" className="app-store-img" />
                    <Img src="/images/app-store-logo.png" alt="app store badge" className="app-store-img" />
                </div>
            </div>
        </div>
    );
}
