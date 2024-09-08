import { Getlist2 } from "../Getlist2";

export default async function handler( req, res) {
  const list2array = await Getlist2( );
  if ( list2array && list2array !=false ) {   
         res.status(200).json({ list2array }); 
  } else { 
        return false
  }
 
}
