import { Getlist1 } from "../Getlist1";

export default async function handler( req, res) {
  const list1array = await Getlist1( );
  if ( list1array && list1array !=false ) {   
         res.status(200).json({ list1array }); 
  } else { 
        return false
  }
 
}
