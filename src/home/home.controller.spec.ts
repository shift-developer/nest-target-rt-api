import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from '@home/home.controller';
import { HomeService } from '@home/home.service';
import { appInfo, homeServiceMock } from '@home/mocks/home.mocks';

describe('HomeController', () => {
  let controller: HomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [{ provide: HomeService, useValue: homeServiceMock }],
    }).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GIVEN getHealth method', () => {
    describe('WHEN it is called', () => {
      it('THEN should call HomeService one time', () => {
        controller.getHealth();
        expect(homeServiceMock.appInfo).toHaveBeenCalledTimes(1);
      });
      it('THEN should return version and app name', () => {
        expect(controller.getHealth()).toEqual(appInfo);
      });
    });
  });
});
