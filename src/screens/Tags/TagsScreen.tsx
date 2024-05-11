import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import CreateTagModal from '../../components/Modals/CreateTagModal';
import TagItem from '../../components/Tags/TagItem';
import AddBar from '../../components/UI/AddBar';
import SearchBar from '../../components/UI/SearchBar';
import SelectItemType from '../../components/UI/SelectItemType';
import { useTagStore } from '../../stores/tag.store';

export default function TagsScreen({ navigation }: TagsScreenProps) {
  const { tagIds, getTag } = useTagStore((state) => ({
    tagIds: state.tagIds,
    getTag: state.getTag,
  }));

  const [triggerCreateTagModal, setTriggerCreateTagModal] = useState(false);
  const [tagIdsToRender, setTagIdsToRender] = useState(tagIds);

  useEffect(() => {
    setTagIdsToRender(tagIds);
  }, [tagIds]);

  let tagLetterSection = '#';

  function isTagLetterSectionDifferent(title) {
    const isLetterDiff = tagLetterSection !== title.charAt(0);
    if (isLetterDiff) {
      tagLetterSection = title.charAt(0);
    }
    return isLetterDiff;
  }

  return (
    <View className="bg-dark1 h-full flex items-center pt-2">
      <CreateTagModal trigger={triggerCreateTagModal} setTrigger={setTriggerCreateTagModal} />
      <SelectItemType itemType="tag" navigation={navigation} />
      <SearchBar itemType="tag" itemIdsToRender={tagIds} setItemIdsToRender={setTagIdsToRender} />
      <AddBar setTrigger={setTriggerCreateTagModal} />
      <View className="mt-6">
        <FlatList
          data={tagIdsToRender}
          renderItem={({ item }) => (
            <TagItem
              tagId={item}
              navigation={navigation}
              isShowLetter={isTagLetterSectionDifferent(getTag(item).name)}
            />
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            gap: 10,
          }}
          style={{ height: '89%', flexGrow: 0 }}
        />
      </View>
    </View>
  );
}
