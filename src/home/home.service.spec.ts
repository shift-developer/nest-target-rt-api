import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from '@home/home.service';
import { ConfigService } from '@nestjs/config';
import { configServiceMock, appInfo } from '@home/mocks/home.mocks';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GIVEN appInfo method', () => {
    describe('WHEN it is called', () => {
      it('THEN should call ConfigService two times with correct keys', () => {
        service.appInfo();
        expect(configServiceMock.get).toBeCalledWith('app.name');
        expect(configServiceMock.get).toBeCalledWith('app.version');
        expect(configServiceMock.get).toHaveBeenCalledTimes(2);
      });
      it('THEN should get correct appInfo', () => {
        expect(service.appInfo()).toEqual(appInfo);
      });
    });
  });
});
