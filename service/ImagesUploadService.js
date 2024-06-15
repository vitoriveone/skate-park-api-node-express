import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(`${__dirname}/../public/assets/img/avatar`)

const genImageName = () =>{
    const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const len = 8; 
    let ImageName = '';

    for (let i = 0; i < len; i++) {
        ImageName += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }

    const nowDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    const nameGen = `${nowDate}_${ImageName}.jpg`;
    return nameGen;
}

const saveFileAvatar = (foto) =>{
    
    //const fotoName = foto.name;
    const fotoName  = genImageName();
    
    let fotoPath = path.join( IMAGES_DIR, fotoName);
  
    foto.mv(fotoPath, (err) => {
      if (err) {
        return null;
      }
    });

    return fotoName;
}

const removeFileAvatar = async (foto) => {
    try{
        fs.unlink(`${IMAGES_DIR}/${foto}`, (err) => {
            if (err) {
                console.error(err);
               
            }
        });
        return true;
    }catch(err){
        return false;
    }

}

export {
    saveFileAvatar,
    removeFileAvatar
}