
import ResultLabelComponent from './result_label_component';
import { ResponseType } from '@/types/search_response_type.';
import { ObjectType } from '@/types/search_object_type';
import ThreeDotsComponent from '../common/option_component';

import EmptyDataComponent from '../common/empty_data_component';
import { dummyOptions } from '@/dummy/dropdown_options';
import BottomItemComponent from './bottom_item_component';

interface BottomWrapperComponentProps {
    data: ResponseType;
}

const BottomWrapperComponent: React.FC<BottomWrapperComponentProps> = ({ data }) => {

    return (
        <div className="top-s-15 pt-[30px]">
            <div className="px-[20px] py-[10px] flex items-center justify-between border-b-1 border-b-[#50515d80] sticky top-[60px] bg-[#161727]">
                <ResultLabelComponent text="Top Results for" label={data.keyword} />
                <div className="flex gap-1">
                    <ThreeDotsComponent padding={0} color="white" options={dummyOptions} />
                </div>
            </div>
            <div className="items">
                {
                    data?.result_count > 0 ? (
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-[#1213206e] p-4">
                            {data?.data?.map((obj: ObjectType, idx: number) => (
                                <div key={idx} className="w-full">
                                    <BottomItemComponent
                                        image={obj.artwork_url}
                                        title={obj.artist_name}
                                        label={obj.collection_name}
                                        colorIndex={idx}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyDataComponent text="No results found" keyword={data.keyword} className="flex justify-center items-center py-7" />
                    )
                }
            </div>
        </div>
    );
};

export default BottomWrapperComponent;