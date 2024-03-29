import NavLinks from "../NavLink";

const ElementsNav = ({items}) => {
    
    return(
        <>
        {items.map(value => {
        
            return(
                <NavLinks key={value.id} text={value.text} link={value.text} icon={value.icon} />
            )
        })} 
        </>   
    ) 
} 

export default ElementsNav;