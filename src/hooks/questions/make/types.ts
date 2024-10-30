export default class MakeQuestionState {
  title: string = '';
  content: string = '';
  hashTags: { value: string }[] = [];
  level: (typeof MakeQuestionState.LEVELS)[number] = '어린이';
  isCheck: boolean = false;

  static toApiRequest(state: MakeQuestionState) {
    const { title, content, hashTags, level } = state;
    return {
      title,
      content,
      hashTags: hashTags.map(({ value }) => value),
      isChild: level === MakeQuestionState.LEVELS[0],
    };
  }

  static LEVELS: ['어린이', '전문가'] = ['어린이', '전문가'];
}
