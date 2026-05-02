import { HostelDetail, HostelDetailRequest } from '../interfaces/hosteldetail';

describe('HostelDetail Interface', () => {

  it('should create a valid HostelDetail object', () => {

    const data: HostelDetail = {
      id: 1,
      hostelId: 1,
      name: 'Room A',
      levelId: 1,
      intakeId: 1,
      genderId: 1,
      createdAt: '2026-01-01T10:00:00',
      updatedAt: '2026-01-01T10:00:00'
    };

    expect(data).toBeTruthy();
    expect(data.name).toBe('Room A');

  });

});
