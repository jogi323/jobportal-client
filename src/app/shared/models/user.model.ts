export  class User {
    _id?:String;
    Firstname : String;
    Lastname : String;
    Email_Address: String;
    Address_street : String;
    Address_Unit: String;
    PositionId?:String;
    City : String;
    State : String;
    Zip_Code: number;
    locationLat?:Number;
    locationLng?: Number;
    Phone1?:any;
    Phone2?:number;
    Position?:String;
    workInfo?: Boolean;
    personalInfo?: Boolean;
    Experience?:number;
    Hourly_Pay?:number;
    Practice_Name: String;
    image:any;
    Speciality: String;
    Practice_Phone: number;
    Nr_of_Operations: number;
    Nr_of_Staff: number;
    Travel_Distance?:number;
    Languages: any[];
    Dental_School: String;
    Year_Graduated: number;
    License_Nr: String;
    Years_in_Practice: number;
    Contact_Person?: String;
    Contact_Phone_Nr?: number;
    token?:string
    role?:string;
    otpVerified?:Boolean
}