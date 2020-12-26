import serviceHandler from "../../utils/services/serviceHandler";

export const GetTrendingPropertiesAction = async () => {
  const res = await serviceHandler.get(`property/trend`);
  return res;
};

export const GetRecommendedPropertiesAction = async () => {
  const res = await serviceHandler.get(`property/recommended`);
  console.log("recomended -->", res);
  return res;
};

export const GetPropertyByIdAction = async (id) => {
  const res = await serviceHandler.get(`property/${id}`);
  return res;
};

export const AddPropertyAction = async (property) => {
  const res = await serviceHandler.post(`property`, {
    body: JSON.stringify(property),
  });
  return res;
};

export const GetNearByPropertiesAction = async (lat, lon) => {
  const res = await serviceHandler.get(`property/map?lat=${lat}&lon=${lon}`);
  return res;
};

export const searchPropertyByTerm = async (term) => {
  try{
    const res = await serviceHandler.get(`property/searchList?term=${term}`)
    console.log('res of term -->',res)
    return res
  }
  catch(e){
    throw e
  }
}

export const SearchPropertiesAction = async ({
  lat,
  lon,
  propertyFor,
  propertyType,
  avaialable_immediately,
  student_only,
  bed_rooms,
  bath_rooms,
  furniture,
  air_condition,
  car_parking,
  internet,
  electricity,
  water,
  living_rooms,
  page,
  limit,
}) => {
  console.log(
    `property/search?lat=${lat}&lon=${lon}${
      propertyFor ? `&propertyFor=${propertyFor}` : ""
    }${
      avaialable_immediately
        ? `&avaialable_immediately=${avaialable_immediately}`
        : ""
    }
  ${student_only ? `&student_only=${student_only}` : ""}
  ${bed_rooms ? `&features.bed_rooms=${bed_rooms}` : ""}
  ${bath_rooms ? `&features.bath_rooms=${bath_rooms}` : ""}
  ${furniture ? `&features.furniture=${furniture}` : ""}
  ${air_condition ? `&features.air_condition=${air_condition}` : ""}
  ${car_parking ? `&features.car_parking=${car_parking}` : ""}
  ${internet ? `&features.internet=${internet}` : ""}
  ${electricity ? `&includes.electricity=${electricity}` : ""}
  ${water ? `&includes.water=${water}` : ""}
  ${living_rooms ? `&features.living_rooms=${living_rooms}` : ""}
  ${propertyType ? `&propertyType=${propertyType}` : ""}${
      page ? `&page=${page}` : ""
    }${limit ? `&limit=${limit}` : ""}`.split("")
  );
  const res = await serviceHandler.get(
    `property/search?lat=${lat}&lon=${lon}${
      propertyFor ? `&propertyFor=${propertyFor}` : ""
    }${
      avaialable_immediately
        ? `&avaialable_immediately=${avaialable_immediately}`
        : ""
    }${student_only ? `&student_only=${student_only}` : ""}${
      bed_rooms ? `&features.bed_rooms=${bed_rooms}` : ""
    }${bath_rooms ? `&features.bath_rooms=${bath_rooms}` : ""}${
      furniture ? `&features.furniture=${furniture}` : ""
    }${air_condition ? `&features.air_condition=${air_condition}` : ""}${
      car_parking ? `&features.car_parking=${car_parking}` : ""
    }${internet ? `&features.internet=${internet}` : ""}${
      electricity ? `&includes.electricity=${electricity}` : ""
    }${water ? `&includes.water=${water}` : ""}${
      living_rooms ? `&features.living_rooms=${living_rooms}` : ""
    }${propertyType ? `&propertyType=${propertyType}` : ""}${
      page ? `&page=${page}` : ""
    }${limit ? `&limit=${limit}` : ""}`
  );
  return res;
};

export const getFavouriteProperty = async () => {
  try{
    const res = await serviceHandler.get(
      `user/favorite`
    );
    console.log('res of fav -->',res)
    if (res.result) {
      return res.body;
    }
    throw res.message;
  }
  catch(e){
    throw e;
  }
}

export const addFavouriteProperty = async (obj) => {
  try{
    const res = await serviceHandler.put(
      `user/favorite`,
      { body: JSON.stringify(obj) }
    );
    if (res.result) {
      return res.body;
    }
    throw res.message;
  }
  catch(e){
    throw e;
  }
}

export const removeFavouriteProperty = async (obj) => {
  try{
    const res = await serviceHandler.put(
      `user/remove_favorite`,
      { body: JSON.stringify(obj) }
    );
    if (res.result) {
      return res.body;
    }
    throw res.message;
  }
  catch(e){
    throw e;
  }
}