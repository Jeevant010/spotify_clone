
const TextWithHover = ({ displayText, active, onClick }) => {
    return(
        <div
            className="flex items-center justify-start cursor-pointer"
            onClick={onClick}
        >
            <div className={`${
                active ? 'text-white' : 'text-gray-500'
                } font-semibold hover:text-white text-lg`}>
                {displayText}
            </div>
        </div>
    )
}

export default TextWithHover;