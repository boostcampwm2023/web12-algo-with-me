import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';

describe('ScoreController', () => {
  let controller: ScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
    }).compile();

    controller = module.get<ScoreController>(ScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
