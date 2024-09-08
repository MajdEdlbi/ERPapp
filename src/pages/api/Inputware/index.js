import { Inputwareapi } from "../Inputwareapi";

export default async function handler( req, res) {
  const warehouse = await Inputwareapi( );
  if ( warehouse && warehouse !=false ) {   
         res.status(200).json({ warehouse }); 
  } else { 
        return false
  }
 
}
