import { Img } from '../Img';
import { Text } from '../Text';
import { Link } from 'react-router-dom';

type DestinationCardProps = {
    dest: string;
    divClass: string;
    image: string;
    imageClass: string;
    name: string;
    place: string;
};
export default function DestinationCard(destCard: DestinationCardProps) {
    return (
        <Link to={destCard.dest}>
            <div className={destCard.divClass}>
                <Img src={destCard.image} alt={destCard.name} className={destCard.imageClass} />
                <div className="top-dest-item-div">
                    <Text as="p" className="top-dest-item-name">
                        {destCard.name}
                    </Text>
                    <Text as="p" className="top-dest-item-place">
                        {destCard.place}
                    </Text>
                </div>
            </div>
        </Link>
    );
}
