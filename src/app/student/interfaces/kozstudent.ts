export interface KozstudentResponse {

  id: number;

  fullname: string;

  coursename: string;

  courseprice: number;
  programId: number;

  createdAt: string;

  accessed: boolean;
}

export interface KozstudentRequest {

  fullname: string;

  coursename: string;

  courseprice: number;

  accessed: boolean;

  programId: number;

}
