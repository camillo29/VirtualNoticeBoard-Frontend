/**
 * Address component displaying the address data (country, province, city, street)
 * @param {any} props
 *              Address - object with address data
 */
const Address = (props) => {
    const displayStreetIfExists = () => {
        if (props.address.street && props.address.street !== null)
            return <> {props.address.street} </>
    }

    return (
        <div style = {{fontSize: '150%'}}>
            <p> {props.address.country} </p>
            <p> {displayStreetIfExists()} in {props.address.city} ({props.address.province}) </p>
            
        </div>
    );
}

export default Address;