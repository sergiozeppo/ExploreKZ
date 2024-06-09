import DestinationCard from '../DestinationCard';
import { Text } from '../Text';

export default function TopDestinations() {
    return (
        <div className="top-dest-cont">
            <Text as="h2" className="top-dest-title">
                Top Most Popular Destinations
            </Text>
            <div className="top-dest-items-wrapper">
                <div className="top-dest-items-col">
                    <div className="top-dest-items-left">
                        <DestinationCard
                            dest="/catalog/adventures/multi-day/d74c4ce0-cd13-470a-b716-99474483df00"
                            divClass="top-dest-top-left"
                            image="/images/kolsay.jpg"
                            imageClass="top-dest-horizontal-img"
                            name="Kolsai Lake"
                            place="Almaty region"
                        />
                        <div className="top-dest-items-left-bottom">
                            <DestinationCard
                                dest="/catalog/adventures/multi-day/d0f9a002-b4c9-4a71-ba43-d96e614bde81"
                                divClass="top-dest-bottom-left"
                                image="/images/burabai.jpg"
                                imageClass="top-dest-horizontal-img"
                                name="Burabai"
                                place="Akmola region"
                            />
                            <DestinationCard
                                dest="/catalog/adventures/one-day/c0dac2f5-430d-4faa-95c4-3abcecefe85d"
                                divClass="top-dest-bottom-left"
                                image="images/charyn.jpg"
                                imageClass="top-dest-horizontal-img"
                                name="Charyn Canyon"
                                place="Almaty region"
                            />
                        </div>
                    </div>
                    <div className="top-dest-items-right">
                        <DestinationCard
                            dest="/catalog/tours/historical-cultural/0481f7e4-e36f-4129-b576-bdb9f8029310"
                            divClass="top-dest-item"
                            image="images/saraychik.jpg"
                            imageClass="top-dest-top-right"
                            name="Saraychik"
                            place="Atyrau region"
                        />
                        <DestinationCard
                            dest="/catalog/adventures/multi-day/230fbab4-4044-4559-8249-6e208671ee0f"
                            divClass="top-dest-item"
                            image="images/zerenda.jpg"
                            imageClass="top-dest-top-right"
                            name="Zerenda"
                            place="Akmola region"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
