import PropTypes from 'prop-types'

const Header = ({title, position}) => {
    return (
        <header className='header' style={{textAlign:position}}>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'Gerer les contrats',
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header