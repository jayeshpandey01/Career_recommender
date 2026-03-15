from pydantic import BaseModel
class Test(BaseModel):
    query: str
t = Test(query="hello")
print(t.model_dump())
