
const SIZES = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
}

export default function Loader({size = "md"}) {

    return(
        <div className={`spinner ${SIZES[size]}`}>
            { Array.from({length: 2}).map((_, i) =>
                <div 
                    key={`dot-${i}`}
                    className={`double-bounce${i+1}`}></div>
            )}
        </div>
    )
}