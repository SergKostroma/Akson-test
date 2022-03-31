import { CITIES_LIST } from "./const";

export function apiGetCitiesList () {
    const promise = new Promise (function(resolve){
       setTimeout ( function(){
           resolve( CITIES_LIST)
       },1500)

    })
    return promise;
}

import { CITIES_STATS} from "./const";

export function apiGetCityInfo(id){
    const promise = new Promise(function (resolve){
        
      
        setTimeout (function(){
            let result 
            for (let city of CITIES_STATS){
                if (city.cityId == id)
                result = city.stats
            }
           
            resolve(result)
        },350)
    })
    return promise;
    

}