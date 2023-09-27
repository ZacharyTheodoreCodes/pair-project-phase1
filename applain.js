/**
 * npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string
 * npx sequelize-cli model:generate --name Profile --attributes username:string,bio:string,UserId:integer
 * npx sequelize-cli model:generate --name Post --attributes ProfileId:integer,imgUrl:string
 * npx sequelize-cli model:generate --name Tag --attributes name:string
 * npx sequelize-cli model:generate --name PostTag --attributes PostId:integer,TagId:string
 * 
 * 
 * 
 * 
 * npx sequelize-cli migration:generate --name addCaptionColumnToPost
 * 
 * npx sequelize-cli seed:generate --name profile-seed
 * npx sequelize-cli seed:generate --name post-seed
 * npx sequelize-cli seed:generate --name user-seed
 * npx sequelize-cli seed:generate --name tag-seed
 * npx sequelize-cli seed:generate --name postTag-seed
 */