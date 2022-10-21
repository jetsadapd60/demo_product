export interface IdCardRespone {
  error_code: string;
  error_message: string;
  error_parameters: Errorparameters;
  result: Result;
  response_id: string;
}

interface Result {
  field: Field;
}

interface Field {
  id_number: Idnumber;
  title_name_surname_th: Idnumber;
  title_name_en: Idnumber;
  surname_en: Idnumber;
  dob_th: Idnumber;
  dob_en: Idnumber;
  religion: Idnumber;
  address_1: Idnumber;
  address_2: Idnumber;
  doi_th: Idnumber;
  doi_en: Idnumber;
  doe_th: Idnumber;
  doe_en: Idnumber;
}

interface Idnumber {
  bbox: number[][];
  value: string;
  confidence: number;
}

interface Errorparameters {
}