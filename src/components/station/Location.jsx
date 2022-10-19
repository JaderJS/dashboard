const Location = ({ latitude, longitude }) => {

    return (
        <iframe src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=12&output=embed`}
            frameBorder="0"
            width="600"
            height="500"
            allowFullScreen>
        </iframe>
    )
}

export default Location
