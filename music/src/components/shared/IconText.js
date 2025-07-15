import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (targetLink) {
            navigate(targetLink);
        }
    };

    return (
        <div
            className="flex items-center justify-start cursor-pointer"
            onClick={handleClick}
        >
            <div className="px-10 py-3">
                <Icon icon={iconName} color={active ? 'white' : 'gray'} fontSize={25} />
            </div>

            <div
                className={`${
                    active ? 'text-white' : 'text-gray-400'
                } text-sm font-semibold hover:text-white`}
            >
                {displayText}
            </div>
        </div>
    );
};

export default IconText;
