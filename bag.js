const LibraryBoxxsData = $PacoLibraryBoxxsData;
const IndexOne = LibraryBoxxsData.findIndex((value)=>value._key === boxx_id);
if(IndexOne != -1) {
    LibraryBoxxsData[IndexOne].bag_it = !done;
    PacoLibraryBoxxsData.set(LibraryBoxxsData);
}
const LibraryBoxxCacheData = $PacoCacheLibraryBoxxData;
const IndexTwo = LibraryBoxxCacheData.findIndex((value)=>value.key === boxx_id);
if(IndexTwo != -1) {
    LibraryBoxxCacheData[IndexTwo].boxx.bag_it = !done;
    PacoCacheLibraryBoxxData.set(LibraryBoxxCacheData);
}
let { cursor, data } = await $PacoLibraryBoxxData;
const One = data.findIndex((value)=>{
    return value._key === boxx_id;
});
async function UpdateLibraryBoxx(index){
    data[index].bag_it = !done;
    data = [...data];
    cursor = data.length > 0 ? data[data.length-1]._key : "0";
    return { cursor, data };
}
if(One != -1) PacoLibraryBoxxData.set(UpdateLibraryBoxx(One));
PacoLibraryBoxxConduit.set({ data:[], cursor: "0" });
async function RemoveBag(boxx_id) {
    PacoLibraryBagBoxx.set(null);
    const BoxxsData = $PacoLibraryBagBoxxsData;
    PacoLibraryBagBoxxsData.set(BoxxsData.filter((boxx)=>boxx.boxx_id !== boxx_id));
    const Boxxs = $PacoCacheLibraryBagBoxxData;
    PacoCacheLibraryBagBoxxData.set(Boxxs.filter(({key})=>key !== boxx_id));
    let { data } = await $PacoLibraryBagBoxxData;
    async function MakeAsync() {
        return { data:data.filter((boxx)=>boxx.boxx_id !== boxx_id), cursor:data.length > 0 ? data[data.length-1].createdAt : "0" }
    }
    PacoLibraryBagBoxxData.set(MakeAsync());
    let conduit = await $PacoLibraryBagBoxxConduit;
    PacoLibraryBagBoxxConduit.set({ data:conduit.data.filter((boxx)=>boxx.boxx_id !== boxx_id), cursor: conduit.cursor });
}
await RemoveBag(boxx_id);
