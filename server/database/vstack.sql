drop database if exists vstack;
create database vstack;
use vstack;
-- SET GLOBAL log_bin_trust_function_creators = 1;

-- create users table
create table users (
	id int AUTO_INCREMENT,
    username varchar(30) not null unique,
    passwd varchar(100) not null,
    createdAt datetime default CURRENT_TIMESTAMP,
    updatedAt datetime default CURRENT_TIMESTAMP,
    primary key(UID)
);

-- create posts table
create table posts(
	PID int auto_increment,
    title varchar(50) not null,
    postText varchar(500) not null,
    UID int, 
    createdAt datetime default CURRENT_TIMESTAMP,
    updatedAt datetime default CURRENT_TIMESTAMP,
    primary key(PID),
    foreign key(UID) references users(UID)
);

-- create comments table
create table comments(
	CID int auto_increment,
    cmtText varchar(500) not null,
    PID int,
    UID int,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    primary key (CID),
	foreign key(PID) references posts(PID),
    foreign key(UID) references users(UID)
);

-- create likes table
create table likes(
    PID int,
    UID int,
    createdAt datetime default current_timestamp,
    foreign key(PID) references posts(PID),
    foreign key(UID) references users(UID),
	primary key (PID, UID)
);

-- create table to store posts were deleted
create table posts_deleted(
	PID int,
    title varchar(50),
    postText varchar(500),
    UID int, 
    date_del datetime
);

-- trigger to store posts were deleted (Dong)
delimiter $$
create trigger trigg_post_del
after delete on posts for each row
begin
	insert into posts_deleted values(old.PID, old.title, old.postText, old.UID, now());
end; $$
delimiter ;

-- procedure to sign up a account (Vy)
delimiter $$
create procedure sign_up(in userName varchar(30), in passwd varchar(500))
begin
	if not exists (select userName from users where users.userName = userName)
		then
			insert into users(userName, passwd) values (userName, passwd);
			select UID as id from users where users.userName = userName;
		else	
			select 0 as id;
	end if;
end; $$
delimiter ;

-- function to validate a account (Vy)
delimiter $$
create function validate_user(UID int, Username varchar(30))
	returns int
begin
	declare val int default 0;
    if exists (select u.UID from users u where u.UID=UID and u.userName = Username)
		then
			set val = 1;
	end if;
    return val;
end; $$
delimiter ;

-- procedure to sign in a account (Vy)
delimiter $$
create procedure sign_in(in userName varchar(30))
begin
	if exists (select userName from users where users.userName = userName)
		then
			select passwd as pass, UID as id from users where users.userName = userName;
		else	
			select 0 as id;
	end if;
end; $$
delimiter ;

-- procedure to create a post (Vy)
delimiter $$
create procedure add_post (in title varchar(50), in postText varchar(500),  in v_UID int)
begin
	if exists (select UID from users where users.UID = v_UID)
		then
			insert into posts(title, postText, UID) values (title, postText, v_UID);
            select PID as id from posts p where p.title = title and p.postText = postText and p.UID = v_UID;
		else	
			select 0 as id;
	end if;
end; $$
delimiter ;

-- count number like of a post (Vy)
delimiter $$
create function get_like_of(PID int)
	returns int
begin
	declare cnt int default -1;
    if exists (select ps.PID from posts ps where ps.PID=PID)
		then
			select count(PID) into cnt from likes where likes.PID=PID;
	end if;
    return cnt;
end; $$
delimiter ;

-- get username of UID (Dong)
delimiter $$
create function get_username_of(UID int)
	returns varchar(30)
begin
	declare uname varchar(30) default "";
    if exists (select u.UID from users u where u.UID=UID)
		then
			select userName into uname from users u where u.UID=UID;
	end if;
    return uname;
end; $$
delimiter ;

-- count number cmt of a post (Vy)
delimiter $$
create function get_cmt_of(PID int)
	returns int
begin
	declare cnt int default -1;
    if exists (select ps.PID from posts ps where ps.PID=PID)
		then
			select count(PID) into cnt from comments c where c.PID=PID;
	end if;
    return cnt;
end; $$
delimiter ;

-- procedure to show all posts (Dong)
delimiter $$
create procedure listPost(in UserId int)
begin
	select p.PID, p.title, p.postText as pText, p.UID as id, get_username_of(p.UID) as pusername,
    get_like_of(p.PID) as numLike, get_cmt_of(p.PID) as numCmt,
    case 
		when exists (select UID from likes where UID = UserId and PID = p.PID)
			then 1
        else 0
	end	as isLike
    from posts p
    order by p.updatedAt desc;
end; $$
delimiter ;

-- procedure to show a post by PID (Vy)
delimiter $$
create procedure getPostByID(in UserId int, in PID int)
begin
    select p.PID, p.title, p.postText as pText, p.UID as id, get_username_of(p.UID) as pusername,
    get_like_of(p.PID) as numLike, get_cmt_of(p.PID) as numCmt,
    case 
		when exists (select UID from likes where UID = UserId and PID = p.PID)
			then 1
        else 0
	end	as isLike
    from posts p
    where p.PID = PID;
end; $$
delimiter ;

-- procedure to delete a post (Dong)
delimiter $$
create procedure delete_post(in PID int, in UID int)
begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
	if exists (select p.UID from posts p where p.PID = PID and p.UID = UID)
		then
			set autocommit = 0;
			start transaction;
			delete from comments where comments.PID = PID;
			delete from likes where likes.PID = PID;
			delete from posts where posts.PID = PID;
			commit;
            set autocommit = 1;
            select 1 as id;
		else
			select 0 as id;
	end if;
end; $$
delimiter ;

-- procedure to add a comment (Dong)
delimiter $$
create procedure add_cmt (in cText varchar(500), in PID int, in v_UID int)
begin
		insert into comments(cmtText, PID, UID) values (cText, PID, v_UID);
        select CID as cmtId from comments c where c.cmtText = cText and c.PID = PID and c.UID = v_UID;
end; $$
delimiter ;

-- procedure to show all comments of a post (Vy)
delimiter $$
create procedure list_cmt_of(in PID int)
begin
	select CID as cmtId, cmtText as cText, c.UID as id, get_username_of(c.UID) as Username
    from comments c
    where c.PID=PID
    order by c.updatedAt;
end; $$
delimiter ;

-- procedure delete a comment (Vy)
delimiter $$
create procedure delete_cmt(in CID int)
begin
	delete from comments where comments.CID=CID;
end; $$
delimiter ;

-- function to react a post (Dong)
delimiter $$
create function act_like(PID int, UID int)
	returns int
begin
    if not exists (select l.PID from likes l where l.PID = PID and l.UID=UID)
		then
			insert into likes(PID, UID) values (PID, UID);
            return 1;
		else																		
			delete from likes where likes.PID=PID and likes.UID=UID;
			return -1;
	end if;
end; $$
delimiter ;

-- procedure to show all post by UID (Dong)
delimiter $$
create procedure getPostByUserID(in UserId int, in v_UID int)
begin
    select p.PID, p.title, p.postText as pText, p.UID as id, get_username_of(p.UID) as pusername,
    get_like_of(p.PID) as numLike, get_cmt_of(p.PID) as numCmt,
    case 
		when exists (select UID from likes where UID = UserId and PID = p.PID)
			then 1
        else 0
	end	as isLike
    from posts p
    where p.UID = v_UID;
end; $$
delimiter ;

-- procedure to change password (Vy)
delimiter $$
create procedure update_password(in UID int, in newpasswd varchar(500))
begin
    if exists (select UID from users u where u.UID=UID)
		then
			update users u set u.passwd=newpasswd, u.updatedAt=now() where u.UID=UID;
	end if; 
end; $$
delimiter ;

-- procedure to show all deleted posts of a user (Dong)
delimiter $$
create procedure get_deleted_posts(in UserId int)
begin
    select d.PID, d.title, d.postText as dText
    from posts_deleted d
    where d.UID = UserId;
end; $$
delimiter ;

-- procedure to delete permanently a post from posts_deleted (Dong)
delimiter $$
create procedure delete_post_permant(in PID int, in UID int)
begin
    delete from posts_deleted
    where posts_deleted.UID = UID and posts_deleted.PID = PID;
end; $$
delimiter ;

-- procedure to edit a post (Vy)
delimiter $$
create procedure update_post(in PID int, in title varchar(50), in postText varchar(500))
begin
	update posts set posts.title=title, posts.postText=postText, posts.updatedAt=now()
    where posts.PID=PID;
end; $$
delimiter ;


insert into users(userName, passwd) values('hxpdong1','$2b$10$zT0M5oV2qS.LRC5VmfiOVezlg6c4YOH0e/7DGSgx9jF9T/gH.pl0a');
insert into users(userName, passwd) values('hxpdong2','$2b$10$Cgy6Q2QZMoPWY.CbFkBaVeY6fBt8e1h3IwAJ1I9vi9PE/XBksCgPC');
insert into users(userName, passwd) values('hxpdong3','$2b$10$6RfxzzSOC7artwJw6eY7k.Irtlto/pX20fA2Mn7pCZ.ykCPAVm/f6');
insert into users(userName, passwd) values('hxpdong4','$2b$10$hklJqKi8VuyEAalg4ZPfM.oUrwWn19yiAr1HShB8MZ72FmhshcLei');
insert into users(userName, passwd) values('hxpdong5','$2b$10$jPIyzuQb9UnO2gW/Ec4Dk./sR2eSiX5iykx/eOfCls6lRlwtQ5fWq');
insert into users(userName, passwd) values('vtvy1','$2b$10$OegV.w9buT/mxh7FlC31x.jJD.ioVoiv/Y3b0aAVVKD1nJ5n2MT0K');
insert into users(userName, passwd) values('vtvy2','$2b$10$bE5tHFLRms95fe2IftN0LO93VlBcldFDNSqhkN8rcnK2gxA2oYyGy');
insert into users(userName, passwd) values('vtvy3','$2b$10$vXPaRMJ.pxffNsMODDADpOZNKjDrkta1ZTgFTpIBxXqjLKdPlXgLG');
insert into users(userName, passwd) values('vtvy4','$2b$10$oV0EtsWuzaVvltCLgCtTCuqlzRpaFCX9y861DGFHberyeDeTD4YA2');
insert into users(userName, passwd) values('vtvy5','$2b$10$zINZ0ZmtIAyhJkuZVFRr4O97EvT1luzO/cT/MJYmxOqdIV/EWaZSy');


insert into posts(title, postText, UID) values("Title", "I am a hacker, give me 5$ or you will lost your data!", 6);
insert into posts(title, postText, UID) values("Hello", "Have a nice day! Enjoy this moment", 1);
insert into posts(title, postText, UID) values("Hope", "I hope I can get A in DBMS", 2);
insert into posts(title, postText, UID) values("Hello world!", "This is my first post. Nice to meet everyone", 3);
insert into posts(title, postText, UID) values("Hey, what are you looking at?", "Why are you seeing this line? I dont know too.", 7);
insert into posts(title, postText, UID) values("So sad", "I was hacked into facebook by someone, so sad!", 3);
insert into posts(title, postText, UID) values("First time", "Haha, I hacked the first person's facebook account successfully", 6);
insert into posts(title, postText, UID) values("Future", "Today I accidentally met a person, I liked her at first sight, she was like a ray of sunshine.", 5);
insert into posts(title, postText, UID) values("I did it", "After many tries, I finally graduated with excellent degree", 9);
insert into posts(title, postText, UID) values("My birthday", "Happy Birthday to me! Have a good life and don't stop trying", 8);


insert into comments(cmtText, PID, UID) values('Good morning!', 2, 1);
insert into comments(cmtText, PID, UID) values('Is that you? T_T?!', 7, 3);
insert into comments(cmtText, PID, UID) values('Congratulation! You are so deserving', 9, 3);
insert into comments(cmtText, PID, UID) values('Thank you very much hxpdong3!', 9, 9);
insert into comments(cmtText, PID, UID) values('Oh, that is love', 8, 2);
insert into comments(cmtText, PID, UID) values('Fighting my friend!', 3, 4);
insert into comments(cmtText, PID, UID) values('Happy birthday!', 10, 5);
insert into comments(cmtText, PID, UID) values('Happy birthday! Hope you always successful', 10, 6);
insert into comments(cmtText, PID, UID) values('Thank all!', 10, 8);
insert into comments(cmtText, PID, UID) values('Oh, sadly', 6, 1);

insert into likes(PID,UID) values(2, 3);
insert into likes(PID,UID) values(2, 4);
insert into likes(PID,UID) values(3, 1);
insert into likes(PID,UID) values(5, 6);
insert into likes(PID,UID) values(10, 3);
insert into likes(PID,UID) values(10, 1);
insert into likes(PID,UID) values(10, 4);
insert into likes(PID,UID) values(10, 6);
insert into likes(PID,UID) values(1,2);

insert into posts(title, postText, UID) values("A bad day", "today is a very bad day for me", 8);


delete from posts where PID=4;
delete from posts where PID=11;



