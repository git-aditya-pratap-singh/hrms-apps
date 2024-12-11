
const profileName = (name)=>{
    return name.split(" ").slice(0, 2).map(item => item[0]).join("").toUpperCase();
 }
 export default profileName;