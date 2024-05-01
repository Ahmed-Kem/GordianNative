import { useState } from 'react';
import { FlatList, View } from 'react-native';

import AddBar from '../../components/AddBar';
import CreateTagModal from '../../components/Modals/CreateTagModal';
import SearchBar from '../../components/SearchBar';
import SelectItemType from '../../components/SelectItemType';
import TagItem from '../../components/Tags/TagItem';
import { useTagStore } from '../../stores/tag.store';

export default function TagsScreen({ navigation }: TagsScreenProps) {
  const { tagIds } = useTagStore((state) => ({
    tagIds: state.tagIds,
  }));

  const [triggerCreateTagModal, setTriggerCreateTagModal] = useState(false);
  const [tagIdsToRender, setTagIdsToRender] = useState(tagIds);

  return (
    <View className="bg-dark1 h-full flex items-center pt-2">
      <CreateTagModal trigger={triggerCreateTagModal} setTrigger={setTriggerCreateTagModal} />
      <SelectItemType itemType="tag" navigation={navigation} />
      <SearchBar itemType="tag" itemIdsToRender={tagIds} setItemIdsToRender={setTagIdsToRender} />
      <AddBar setTrigger={setTriggerCreateTagModal} />
      <View className="mt-6">
        <FlatList
          data={tagIdsToRender}
          renderItem={({ item }) => <TagItem tagId={item} />}
          keyExtractor={(id) => id}
          contentContainerStyle={{
            gap: 10,
          }}
          style={{ height: '85%', flexGrow: 0 }}
        />
      </View>
    </View>
  );
}
