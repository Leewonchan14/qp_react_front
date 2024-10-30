import { HashTagsResponse } from '../../apis/questions.api';

export default function HashTagList({
  hashTags,
}: {
  hashTags: HashTagsResponse[];
}) {
  return (
    <li className="flex flex-nowrap line-clamp-1 text-gray-400 font-bold">
      {hashTags.length === 0 && <span className="text-opacity-20"></span>}
      {hashTags.map((hashTag) => (
        <span
          className="mr-4"
          key={hashTag.hashTagId}
        >{`#${hashTag.hashTag}`}</span>
      ))}
    </li>
  );
}
