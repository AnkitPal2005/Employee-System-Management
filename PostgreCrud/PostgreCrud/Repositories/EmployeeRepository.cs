using Dapper;
using PostgreCrud.Data;
using PostgreCrud.Models;

namespace PostgreCrud.Repositories;

public class EmployeeRepository
{
    private readonly DbConnectionFactory _factory;

    public EmployeeRepository(DbConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task<IEnumerable<Employee>> GetAllAsync()
    {
        using var connection = _factory.CreateConnection();
        var sql = "SELECT * FROM employees";
        return await connection.QueryAsync<Employee>(sql);
    }

    public async Task<int> CreateAsync(Employee emp)
    {
        using var connection = _factory.CreateConnection();
        var sql = @"INSERT INTO employees(name,email,salary)
                    VALUES(@Name,@Email,@Salary)";
        return await connection.ExecuteAsync(sql, emp);
    }
    public async Task<int> UpdateAsync(int id, Employee emp)
    {
        using var connection= _factory.CreateConnection();
        var sql = @"UPDATE employees SET name=@Name,email=@EMAIL,salary=@SALARY WHERE Id=@Id";
        return await connection.ExecuteAsync(sql, new { Id=id,emp.Name,emp.Email,emp.Salary});
    }
    public async Task<int> DeleteAsync(int id)
    {
        using var connection = _factory.CreateConnection();
        var sql = @"DELETE FROM employees WHERE Id=@Id";
        return await connection.ExecuteAsync(sql, new { Id = id });
    }
    public async Task<(IEnumerable<Employee> Data,int TotalCount)> GetPagedAsync(int page,int pageSize,string?search)
    {
        using var connection = _factory.CreateConnection();
        var offset = (page - 1) * pageSize;
        var sql = @"SELECT * FROM employees WHERE (@Search IS NULL OR
       name ILIKE '%' || @Search || '%' OR
       email ILIKE '%' || @Search || '%') ORDER BY id LIMIT @PageSize OFFSET @Offset;SELECT COUNT(*)FROM employees WHERE (@Search IS NULL OR
       name ILIKE '%' || @Search || '%' OR
       email ILIKE '%' || @Search || '%');";
        using var multi = await connection.QueryMultipleAsync(sql, new
        {
            PageSize = pageSize,
            Offset = offset,
            Search = string.IsNullOrWhiteSpace(search) ? null : search

        });

        var data = await multi.ReadAsync<Employee>();
        var total = await multi.ReadSingleAsync<int>();

        return (data, total);

    }
    public async Task<int> TotalEmployee()
    {
        using var connection = _factory.CreateConnection();

        var sql = @"SELECT COUNT(*) FROM employees";

        return await connection.QuerySingleAsync<int>(sql);
    }
    public async Task<int> DeleteMultipleAsync(List<int> ids)
    {
        using var connection = _factory.CreateConnection();

        var sql = @"DELETE FROM employees WHERE id = ANY(@Ids)";

        return await connection.ExecuteAsync(sql, new { Ids = ids });
    }
}