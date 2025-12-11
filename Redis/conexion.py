import redis

r=redis.Redis(host="redis-17251.c281.us-east-1-2.ec2.cloud.redislabs.com",port=17251,password="GhPkB8tD8eP52FfKrWGrqQdHFM7urWwO",ssl=False)
print("PING:", r.ping())
pipe = r.pipeline()
